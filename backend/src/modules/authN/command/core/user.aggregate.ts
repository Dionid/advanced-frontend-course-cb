import {Entity} from "../../../../libs/dddfn/ddd";
import {Nominal, ReverseNominal} from "../../../../libs/dddfn";
import {Email} from "../../../../libs/dddfn/casualTypes";
import {HashedPassword} from "./password.vo";
import {Result} from "../../../../libs/dddfn/result";

export type Token = Nominal<string, "Password">
export const Token = (id: UserId, email: Email): Token => {
  // TODO. add jwt and other stuff
  // ...
  return id + email as Token
}

export type UserId = Nominal<string, "UserId">
export const isUserId = (value: string): value is UserId => {
  return true
}
export const UserId = (value: string): UserId => {
  if (!isUserId(value)) {
    throw new Error("")
  }
  return value
}

export type User = Entity<"User", UserId, {
  email: Email
  password: HashedPassword
}>
const isUser = (user: ReverseNominal<User>): user is User => {
  return true
}
export const User = (user: ReverseNominal<User>): User => {
  if (!isUser(user)) {
    throw new Error("Not User")
  }
  return user
}
