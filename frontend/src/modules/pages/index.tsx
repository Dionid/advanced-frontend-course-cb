import React from "react";
import {HomePage} from "./home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthPage} from "./auth";
import {PAPage} from "./pa/ui";
import {RoomsPage} from "./room/ui";
import {Modal} from "libs/react/components/GlobalModal";
import {AuthNProtectedRoute} from "./common/ui/AuthNProtectedRoute";


export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/rooms" component={RoomsPage}/>
        <Route path="/auth" component={AuthPage}/>
        <AuthNProtectedRoute>
          <Route path="/pa" component={PAPage}/>
        </AuthNProtectedRoute>
      </Switch>
      <Modal/>
    </Router>
  )
}

