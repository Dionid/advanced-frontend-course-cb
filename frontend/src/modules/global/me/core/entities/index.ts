import {Nominal, ReverseNominal} from "libs/dddfn";
import {Email} from "../../../../../libs/dddfn/casualTypes";
import {Entity} from "../../../../../libs/dddfn/ddd";

export type MeId = Nominal<string, "MeId">
export const MeId = (value: string): MeId => {
  return value as MeId
}

export type Me = Entity<"Me", MeId, {
  username: string
  email: Email
  roles: string[]
  registrationDate?: Date
}>
export const isMe = (me: ReverseNominal<Me>): me is Me => {
  return true
}
export const Me = (props: ReverseNominal<Me>): Me => {
  if (!isMe(props)) {
    throw new Error("")
  }
  return props
}
