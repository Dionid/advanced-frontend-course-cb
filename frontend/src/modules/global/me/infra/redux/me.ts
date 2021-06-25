import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import {Me, MeId} from "../../core/entities";
import {ReverseNominal} from "../../../../../libs/dddfn";
import {Email} from "../../../../../libs/dddfn/casualTypes";

export type MeModel = Readonly<Omit<ReverseNominal<Me>, "registrationDate"> & {
  registrationDate: string
}>

const initialState: MeModel = {
  id: "" as MeId,
  username: "",
  email: "" as Email,
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

