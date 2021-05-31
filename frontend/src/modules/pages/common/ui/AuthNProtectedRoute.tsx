import {toast} from "react-toastify";
import {ProtectedRoute} from "libs/react/components/ProtectedRoute";
import React, {FunctionComponent} from "react";
import {useGlobalDependenciesContext} from "../../../global/ui/contexts/GlobalDependenciesCtx";


export const AuthNProtectedRoute: FunctionComponent = ({children}) => {
  const { selectors } = useGlobalDependenciesContext()
  return (
    <ProtectedRoute
      canPass={ () => selectors.isAuthenticated() }
      notPassed={ () => toast.warning("You must be authenticated to get here") }>
      {
        children
      }
    </ProtectedRoute>
  )
}
