import * as React from "react";
import {FunctionComponent, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, FormControl, TextField} from "@material-ui/core";
import {Me} from "../../../../../../global/me/core/entities";
import {EmailMustBeUniqueError, UsernameMustBeUniqueError} from "../../../../../../global/me/core/errors";
import {IsEmailValid} from "../../../../../../global/common/core/validations";
import {IsUsernameValid} from "../../../../../../global/me/core/validations";
import {useGlobalDependenciesContext} from "../../../../../../global/ui/contexts/GlobalDependenciesCtx";


interface PersonalInfoWidgetInfoEditProps {
  me: Me
  cancel: () => void
}

export interface PersonalInfoWidgetInfoEditForm {
  email: string,
  username: string,
}

export const PersonalInfoWidgetInfoEdit: FunctionComponent<PersonalInfoWidgetInfoEditProps> = ({me, cancel}) => {
  const { register, handleSubmit, control, setError } = useForm<PersonalInfoWidgetInfoEditForm>({
    defaultValues: {
      email: me.email,
      username: me.username,
    }
  });
  const { usecases: {meUC} } = useGlobalDependenciesContext()

  useEffect(() => {
    register("email", {
      required: {
        value: true,
        message: "Email обязателен к заполнению"
      },
      validate: (email) => IsEmailValid.check(email).map(e => e.message)[0],
    });
    register("username", {
      validate: (username) => IsUsernameValid.check(username).map(e => e.message)[0],
    });
  }, [register]);

  const onSubmit = handleSubmit(async (data: PersonalInfoWidgetInfoEditForm) => {
    // . Validate
    // ...

    try {
      await meUC.updateMyInfo(data)
    } catch (e) {
      if (e instanceof UsernameMustBeUniqueError) {
        setError("username", {
          message: e.message,
        })
      } else if (e instanceof EmailMustBeUniqueError) {
        setError("email", {
          message: e.message,
        })
      } else {
        throw e
      }
      return
    }
    cancel()
  })

  return (
    <>
      <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
        <Controller
          control={control}
          name="username"
          render={
            ({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Username"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                  onChange={onChange}
                  value={value}
                  style={{marginTop: 15}}
                />
              )
            }
          }
        />
        <Controller
          control={control}
          name="email"
          render={
            ({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Email"
                  variant="outlined"
                  error={!!error}
                  helperText={error?.message}
                  onChange={onChange}
                  value={value}
                  style={{marginTop: 15}}
                />
              )
            }
          }
        />
        <Button variant="contained" color="primary" type="submit" style={{marginTop: 15}}>
          Save
        </Button>
        <Button variant="contained" color="default" onClick={cancel} style={{marginTop: 5}}>
          Cancel
        </Button>
      </form>
    </>
  )
}
