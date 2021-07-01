import {Entity} from "../../../../libs/dddfn/ddd";
import {isNominal} from "../../../../libs/dddfn";
import {Email} from "../../../../libs/dddfn/casualTypes";
import {HashedPassword} from "./password.vo";
import {v4} from "uuid";
import {Nominal, ReverseNominal} from "../../../../libs/nominal";

const TokenToken = Symbol("TokenToken")
export type Token = Nominal<string, typeof TokenToken>
export const isToken = (value: string): value is Token => {
  // TODO. check some stuff
  // ...
  return true
}
export const Token = (value: string): Token => {
  if (!isToken(value)) {
    throw new Error("...")
  }
  return value
}
export const newToken = (id: UserId, email: Email): Token => {
  // TODO. add jwt and other stuff
  // ...
  return Token(id + email)
}

const UserIdToken = Symbol("UserId")
export type UserId = Nominal<string, typeof UserIdToken>
export const isUserId = (value: string): value is UserId => {
  // TODO. Check something
  return true
}
export const UserId = (value: string): UserId => {
  if (!isUserId(value)) {
    throw new Error("")
  }
  return value
}
export const newUserId = (): UserId => {
  return v4() as UserId
}

const UserToken = Symbol("User")
export type User = Entity<typeof UserToken, UserId, {
  email: Email
  password: HashedPassword
}>
const isUser = isNominal<User>(UserToken)
export const User = (user: ReverseNominal<User>): User => {
  return Entity(UserToken, user.id, user)
}
