import React from "react"
import {ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";
import {theme} from "./theme";
import {Provider} from "react-redux";
import {persistor, store} from "../infra/redux/store";
import {GlobalDependenciesContextProvider} from "./contexts/GlobalDependecies";
import {PersistGate} from 'redux-persist/integration/react'
import {GlobalModalContextProvider, Modal} from "libs/react/components/GlobalModal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage} from "../../../modules/pages/home";
import {RoomsPage} from "../../../modules/pages/room/ui";
import {AuthPage} from "../../../modules/pages/auth";
import {AuthNProtectedRoute} from "../../../modules/pages/common/ui/AuthNProtectedRoute";
import {PAPage} from "../../../modules/pages/pa/ui";



const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/rooms" component={RoomsPage}/>
        <Route path="/auth" component={AuthPage}/>
        <AuthNProtectedRoute>
          <Route path="/pa" component={PAPage}/>
        </AuthNProtectedRoute>
      </Switch>
      <Modal/>
    </BrowserRouter>
  )
}

const AppInner = () => {
  return (
    <>
      <Router/>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export const App = function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalDependenciesContextProvider>
              <GlobalModalContextProvider>
                  <CssBaseline />
                  <AppInner/>
              </GlobalModalContextProvider>
            </GlobalDependenciesContextProvider>
          </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}
