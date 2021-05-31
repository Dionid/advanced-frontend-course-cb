import * as React from "react";
import {FunctionComponent} from "react";
import {RouteComponentProps} from "react-router";
import {Route, Switch} from "react-router-dom";
import {RoomInfoPage} from "../pages/info/ui";
import {MainLayout} from "../../common/ui/MainLayout";
import {RoomsListWidget} from "../../../widgets/rooms/list/ui";

const RoomsPageInner = () => {
  return (
    <MainLayout>
      <RoomsListWidget/>
    </MainLayout>
  )
}


export const RoomsPage: FunctionComponent<RouteComponentProps> = function AuthPage({match}) {
  return (
    <Switch>
      <Route exact path={match.url} component={RoomsPageInner} />
      <Route exact path={match.url + "/:id"} component={RoomInfoPage}/>
    </Switch>
  )
}
