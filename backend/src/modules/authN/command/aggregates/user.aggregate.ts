import {Entity} from "../../../../libs/dddfn/ddd";
import {Nominal, ReverseNominal} from "../../../../libs/dddfn";
import {Email} from "../../../../libs/dddfn/casualTypes";
import {HashedPassword} from "./password.vo";
import {Result} from "../../../../libs/dddfn/errors";

export type Token = Nominal<string, "Password">
export const Token = (id: UserId, email: Email): Token => {
  // TODO. add jwt and other stuff
  // ...
  return id + email as Token
}

export type UserId = Nominal<string, "UserId">

export type User = Entity<"User", UserId, {
  email: Email
  password: HashedPassword
}>
const isUser = (user: ReverseNominal<User>): user is User => {
  return true
}
export const User = (user: ReverseNominal<User>): Result<User> => {
  if (!isUser(user)) {
    return [undefined, new Error("Not User")]
  }
  return [user]
}
