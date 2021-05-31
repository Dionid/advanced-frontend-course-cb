import * as React from "react";
import {FunctionComponent} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoginPage} from "./pages/login/ui";
import {RegisterPage} from "./pages/register/ui";
import {RouteComponentProps} from "react-router";

export const AuthPage: FunctionComponent<RouteComponentProps> = function AuthPage({match}) {
  return (
    <Switch>
      <Redirect exact from={match.url} to={match.url + "/login"} />
      <Route exact path={match.url + "/login"} component={LoginPage}/>
      <Route exact path={match.url + "/register"} component={RegisterPage}/>
    </Switch>
  )
}
