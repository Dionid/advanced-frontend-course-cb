import {Dispatch, Reducer, ReducerAction, ReducerState, useReducer} from "react";
import {useNext} from "./useNext";


export const useSyncReducer = <R extends Reducer<any, any>, I>(reducer: R, initialState: I & ReducerState<R>): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const waitNextState = useNext(state)

  return [
    state,
    (action) => {
      dispatch(action)
      return waitNextState()
    },
  ]
}
