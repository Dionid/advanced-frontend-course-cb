import * as React from "react";
import {FunctionComponent, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Me} from "../../../../../../global/me/core/entities";
import {IncorrectOldPasswordError, IncorrectPasswordError} from "../../../../../../global/auth/core/errors";
import {IsPasswordValid} from "../../../../../../global/auth/core/validations";
import {useGlobalDependenciesContext} from "../../../../../../global/ui/contexts/GlobalDependenciesCtx";


interface PersonalInfoWidgetPasswordEditProps {
  me: Me
  cancel: () => void
}

export interface PersonalInfoWidgetPasswordEditForm {
  oldPassword: string,
  newPassword: string,
  newPasswordRepeat: string,
}

export const PersonalInfoWidgetPasswordEdit: FunctionComponent<PersonalInfoWidgetPasswordEditProps> = ({me, cancel}) => {
  const { register, handleSubmit, control, setError, getValues } = useForm<PersonalInfoWidgetPasswordEditForm>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    }
  });
  const [showPassword, setShowPassword] = useState(false)
  const { usecases: {authNUC} } = useGlobalDependenciesContext()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    register("oldPassword", {
      required: {
        value: true,
        message: "Пароль обязателен к заполнению"
      },
      validate: (password) => IsPasswordValid.check(password).map(e => e.message)[0],
    });
    register("newPassword", {
      required: {
        value: true,
        message: "Пароль обязателен к заполнению"
      },
      validate: (password) => IsPasswordValid.check(password).map(e => e.message)[0],
    });
    register("newPasswordRepeat", {
      required: {
        value: true,
        message: "Пароль обязателен к заполнению"
      },
      validate: (value: string) => {
        return value === getValues().newPassword ? undefined : "Password is not equal to New Password"
      }
    });
  }, [register]);

  const onSubmit = handleSubmit(async (data: PersonalInfoWidgetPasswordEditForm) => {
    // . Validate
    // ...

    try {
      debugger
      await authNUC.updateMyPassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      })
    } catch (e) {
      debugger
      if (e instanceof IncorrectPasswordError) {
        setError("newPassword", {
          message: e.message,
        })
      } else if (e instanceof IncorrectOldPasswordError) {
        setError("oldPassword", {
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
      <form onSubmit={ onSubmit } style={{display: "flex", flexDirection: "column"}}>
        <Controller
          control={control}
          name="oldPassword"
          render={
            ({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <FormControl error={!!error} variant={"outlined"}>
                  <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={!!error}>
                    { error?.message }
                  </FormHelperText>
                </FormControl>
              )
            }
          }
        />
        <Controller
          control={control}
          name="newPassword"
          render={
            ({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <FormControl error={!!error} variant={"outlined"} style={{marginTop: 15}}>
                  <InputLabel htmlFor="newPassword">New Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={!!error}>
                    { error?.message }
                  </FormHelperText>
                </FormControl>
              )
            }
          }
        />
        <Controller
          control={control}
          name="newPasswordRepeat"
          render={
            ({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <FormControl error={!!error} variant={"outlined"} style={{marginTop: 15}}>
                  <InputLabel htmlFor="newPasswordRepeat">Repeat New Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error={!!error}>
                    { error?.message }
                  </FormHelperText>
                </FormControl>
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
