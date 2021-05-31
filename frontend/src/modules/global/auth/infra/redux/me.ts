import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {AuthSession} from "../../core/entities";

export interface AuthModel extends AuthSession {}

const initialState: AuthModel = {
  token: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<AuthModel>) => {
      return {
        ...action.payload,
      }
    },
    clear: () => {
      return initialState
    }
  }
})

export const authReducer = authSlice.reducer

