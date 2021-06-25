import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {MeRepository, NotAuthed} from "../../../../modules/global/me/infra/repositories/meRepository";
import {RootState} from "../../infra/redux/store";
import {AuthNUC} from "../../../../modules/global/auth/core/usecases/authN";
import {AuthRepo} from "../../../../modules/global/auth/infra/repositories/authRepo";
import {MeUC} from "../../../../modules/global/me/core/usecases/me";
import {useSelector, useStore} from "react-redux";
import {GqlApi} from "../../infra/gql/api";
import {
  GlobalDependenciesContext,
  GlobalDependenciesContextState
} from "../../../../modules/global/ui/contexts/GlobalDependenciesCtx";

export const GlobalDependenciesContextProvider: FunctionComponent = ({ children }) => {
  const store = useStore<RootState>()
  const [firstInit, setFirstInit] = useState(true)

  // SERVICES
  const gqlApi = useMemo(() => {
    return new GqlApi(
      () => store.getState().auth.token,
    )
  }, [store])

  const value: GlobalDependenciesContextState = useMemo(() => {
    // REPOSITORIES
    const authRepository = new AuthRepo(
      () => store.getState().auth,
      store.dispatch,
      gqlApi,
    )
    const meRepository = new MeRepository(
      () => store.getState().me,
      store.dispatch,
      () => store.getState().auth.token,
      authRepository.isAuthenticated,
      gqlApi,
    )

    // USE CASES
    const authNUC = new AuthNUC(
      authRepository,
      meRepository,
    )
    const meUC = MeUC(
      meRepository,
    )

    return {
      repositories: {
        meRepository,
      },
      usecases: {
        authNUC,
        meUC,
      },
      infra: {
        gqlApi,
      },
      selectors: {
        getMyId: () => store.getState().me.id,
        isAuthenticated: () => authRepository.isAuthenticated(),
        getMe: () => store.getState().me,
      },
      permissions: {
      },
      routes: {
        home: () => `/`,
        login: () => `/auth/login`,
        roomById: (id: string) => `/rooms/${id}`,
        pa: () => `/pa`,
      }
    }
  }, [])

  const auth = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (auth.token) {
      try {
        value.repositories.meRepository.getOrFetchMe()
      } catch (e) {
        debugger
        if (e instanceof NotAuthed) {
          return
        }
      }
    }
    if (!firstInit) {
      gqlApi.refreshWS()
    }
    setFirstInit(false)
  }, [auth.token])

  return (
    <GlobalDependenciesContext.Provider value={value}>
      { children }
    </GlobalDependenciesContext.Provider>
  )
}
