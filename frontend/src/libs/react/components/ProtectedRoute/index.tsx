import {Redirect} from "react-router-dom";
import React, {FunctionComponent} from "react";
import {RedirectProps} from "react-router";


interface ProtectedRouteProps extends Omit<RedirectProps, "to"> {
  to?: string
  canPass: () => boolean
  notPassed?: () => void
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
   children,
   notPassed,
   canPass,
   to ,
   ...redirectProps
}) => {
  if (!canPass()) {
    if (notPassed) notPassed()
    return <Redirect to={to || "/"} {...redirectProps}/>
  }

  return (
    <>
      { children }
    </>
  )
}
