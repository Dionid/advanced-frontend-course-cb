import {createContext, useContext} from "react";
import {AuthNUC} from "../../auth/core/usecases/authN";
import {MeUC} from "../../me/core/usecases/me";
import {MeId} from "../../me/core/entities";
import {GQLApi} from "libs/api/gqlApi";
import {MeModel} from "../../me/infra/redux/me";
import {MeRepository} from "../../me/infra/repositories/meRepository";

export interface GlobalDependenciesContextState {
  usecases: {
    authNUC: AuthNUC,
    meUC: MeUC,
  },
  repositories: {
    meRepository: MeRepository,
  },
  infra: {
    gqlApi: GQLApi,
  },
  selectors: {
    getMyId: () => MeId,
    isAuthenticated: () => boolean,
    getMe: () => MeModel,
  },
  permissions: {
  },
  routes: {
    home: () => string,
    login: () => string,
    roomById: (roomId: string) => string,
    pa: () => string,
  }
}

// @ts-ignore
export const GlobalDependenciesContext = createContext<GlobalDependenciesContextState>({})

export const useGlobalDependenciesContext = () => useContext(GlobalDependenciesContext)
