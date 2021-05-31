import React from "react"
import {ThemeProvider} from '@material-ui/core/styles'
import {CssBaseline} from "@material-ui/core";
import {theme} from "../../../theme";
import {Index} from "../../../modules/pages";
import {Provider} from "react-redux";
import {persistor, store} from "../infra/redux/store";
import {GlobalDependenciesContextProvider} from "./contexts/GlobalDependecies";
import {PersistGate} from 'redux-persist/integration/react'
import {GlobalModalContextProvider} from "libs/react/components/GlobalModal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const AppInner = () => {
  return (
    <>
      <Index/>
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
