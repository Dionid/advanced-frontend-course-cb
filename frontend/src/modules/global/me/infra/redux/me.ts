import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {Me} from "../../core/entities";

export interface MeModel extends Omit<Me, "registrationDate"> {
  registrationDate: string
}

const initialState: MeModel = {
  id: "",
  username: "",
  email: "",
  roles: [],
  registrationDate: "",
}

export const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<MeModel>) => {
      return {
        ...action.payload,
      }
    },
    clear: () => {
      return initialState
    }
  }
})

export const meReducer = meSlice.reducer

