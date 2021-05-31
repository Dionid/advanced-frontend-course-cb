import * as React from "react";
import {createContext, FunctionComponent, useContext, useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {Control} from "react-hook-form/dist/types/form";
import {useHistory} from "react-router-dom";
import {IsPasswordValid} from "../../../../../../global/auth/core/validations";
import {IsEmailValid} from "../../../../../../global/common/core/validations";
import {IncorrectPasswordOrEmail} from "../../../../../../global/auth/core/errors";
import {useGlobalDependenciesContext} from "../../../../../../global/ui/contexts/GlobalDependenciesCtx";

export interface LoginFormContextPropsForm {
  email: string,
  password: string,
}

export interface LoginFormContextProps {
  state: {
    control: Control<LoginFormContextPropsForm>
  },
  fns: {
    onSubmit: () => void,
  }
}

// @ts-ignore
const LoginFormContext = createContext<LoginFormContextProps>({})

export const useLoginFormContext = () => useContext(LoginFormContext)

export const LoginFormContextProvider: FunctionComponent = ({children}) => {
  const { register, handleSubmit, control, setError } = useForm<LoginFormContextPropsForm>({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const {usecases: {authNUC}, routes: {home}} = useGlobalDependenciesContext()
  const history = useHistory()
  const onSubmit = handleSubmit(async (data: LoginFormContextPropsForm) => {
    try {
      await authNUC.login(data)
    } catch (e) {
      debugger
      // . If error returned than show it
      if (e instanceof IncorrectPasswordOrEmail) {
        setError("email", {
          message: e.message,
        })
        return
      }
      return
    }
    history.push(home())
  })

  useEffect(() => {
    register("email", {
      required: {
        value: true,
        message: "Email обязателен к заполнению"
      },
      validate: (email) => IsEmailValid.check(email).map(e => e.message)[0]
    });
    register("password", {
      required: {
        value: true,
        message: "Пароль обязателен к заполнению"
      },
      validate: (password) => IsPasswordValid.check(password).map(e => e.message)[0],
    });
  }, [register]);

  const ctxValue: LoginFormContextProps = useMemo(() => {
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
    <LoginFormContext.Provider value={ctxValue}>
      { children }
    </LoginFormContext.Provider>
  )
}
