import React, {createContext, FunctionComponent, ReactComponentElement, useContext, useMemo, useState} from "react";


interface GlobalModalContextState {
  state: {
    element: ReactComponentElement<any> | null,
    isGlobalModalVisible: boolean,
  },
  fns: {
    showGlobalModal: (value: ReactComponentElement<any>) => void,
    closeGlobalModal: () => void,
  }
}


// @ts-ignore
const GlobalModalContext = createContext<GlobalModalContextState>({})

export const useGlobalModalContext = () => useContext(GlobalModalContext)

export const GlobalModalContextProvider: FunctionComponent = ({ children }) => {
  const [element, setElement] = useState<ReactComponentElement<any> | null>(null)
  const [isGlobalModalVisible, setIsGlobalModalVisible] = useState(false)

  const value = useMemo(() => {
    return {
      state: {
        element,
        isGlobalModalVisible,
      },
      fns: {
        showGlobalModal: (el: ReactComponentElement<any>) => {
          setIsGlobalModalVisible(true)
          setElement(el)
        },
        closeGlobalModal: () => {
          setIsGlobalModalVisible(false)
          setElement(null)
        }
      }
    }
  }, [
    element,
    isGlobalModalVisible,
  ])

  return (
    <GlobalModalContext.Provider value={value}>
      { children }
    </GlobalModalContext.Provider>
  )
}

export const Modal = () => {
  const {
    state,
    fns,
  } = useGlobalModalContext()

  if (!state.isGlobalModalVisible) {
    return null
  }

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div onClick={fns.closeGlobalModal} style={{
        zIndex: 0,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        opacity: 0.5
      }}/>
      <div style={{zIndex: 1, position: "relative"}}>
        {state.element}
      </div>
    </div>
  )
}
