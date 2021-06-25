import * as React from "react";
import {createContext, FunctionComponent, useContext, useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {Control} from "react-hook-form/dist/types/form";
import {useHistory} from "react-router-dom";
import {IsPasswordValid} from "../../../../../../global/auth/core/validations";
import {IsEmailValid} from "../../../../../../global/common/core/validations";
import {isUsernameValid} from "../../../../../../global/me/core/validations";
import {EmailMustBeUniqueError, UsernameMustBeUniqueError} from "../../../../../../global/me/core/errors";
import {useGlobalDependenciesContext} from "../../../../../../global/ui/contexts/GlobalDependenciesCtx";

export interface RegisterFormContextPropsForm {
  email: string,
  username: string,
  password: string,
}

export interface RegisterFormContextProps {
  state: {
    control: Control<RegisterFormContextPropsForm>
  },
  fns: {
    onSubmit: () => void,
  }
}

// @ts-ignore
const RegisterFormContext = createContext<RegisterFormContextProps>({})

export const useRegisterFormContext = () => useContext(RegisterFormContext)

export const RegisterFormContextProvider: FunctionComponent = ({children}) => {
  const { register, handleSubmit, control, setError } = useForm<RegisterFormContextPropsForm>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    }
  });
  const {usecases: {authNUC}, routes: {login}} = useGlobalDependenciesContext()
  const history = useHistory()
  const onSubmit = handleSubmit(async (data: RegisterFormContextPropsForm) => {
    try {
      await authNUC.register(data)
    } catch (e) {
      if (e instanceof EmailMustBeUniqueError) {
        setError("email", {
          message: e.message,
        })
      } else if (e instanceof UsernameMustBeUniqueError) {
        setError("username", {
          message: e.message,
        })
      } else {
        debugger
      }
      return
    }
    history.push(login())
  })

  useEffect(() => {
    register("email", {
      required: {
        value: true,
        message: "Email обязателен к заполнению"
      },
      validate: (email) => IsEmailValid.check(email).map(e => e.message)[0],
    });
    register("password", {
      required: {
        value: true,
        message: "Пароль обязателен к заполнению"
      },
      validate: (password) => IsPasswordValid.check(password).map(e => e.message)[0],
    });
    register("username", {
      validate: (username) => isUsernameValid({username}).map(e => e.message)[0],
    });
  }, [register]);

  const ctxValue: RegisterFormContextProps = useMemo(() => {
    return {
      state: {
        control,
      },
      fns: {
        onSubmit,
      }
    }
  }, [onSubmit, control])

  return (
    <RegisterFormContext.Provider value={ctxValue}>
      { children }
    </RegisterFormContext.Provider>
  )
}
