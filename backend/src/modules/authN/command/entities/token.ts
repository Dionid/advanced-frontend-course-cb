import {Email} from "../../../../libs/dddfn/casualTypes";
import {UserId} from "./user.aggregate";
import {Nominal} from "../../../../libs/nominal";

const TokenToken = Symbol("Token")
export type Token = Nominal<string, typeof TokenToken>
export const Token = (() => {
  const constructor = (value: string) => {
    return value as Token
  }
  return {
    create: (id: UserId, email: Email): Token => {
      // TODO. use jwt to hash it
      const token = id + email
      return constructor(token)
    }
  }
})()
