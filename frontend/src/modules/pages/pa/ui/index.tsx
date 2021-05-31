import * as React from "react";
import {FunctionComponent} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {MePage} from "../pages/me/ui";


export const PAPage: FunctionComponent<RouteComponentProps> = function AuthPage({match}) {
  return (
    <Switch>
      <Redirect exact from={match.url} to={match.url + "/me"} />
      <Route exact path={match.url + "/me"} component={MePage}/>
    </Switch>
  )
}
