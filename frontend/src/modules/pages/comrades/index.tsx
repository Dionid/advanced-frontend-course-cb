import * as React from "react";
import {FunctionComponent} from "react";
import {RouteComponentProps} from "react-router";
import {Route, Switch} from "react-router-dom";
import {MainLayout} from "../common/ui/MainLayout";
import ComradesListWidget from "./widgets/ComradesList";

const ComradePageInner = () => {
  return (
    <MainLayout>
      <ComradesListWidget/>
    </MainLayout>
  )
}


export const ComradePage: FunctionComponent<RouteComponentProps> = function AuthPage({match}) {
  return (
    <Switch>
      <Route exact path={match.url} component={ComradePageInner} />
    </Switch>
  )
}
