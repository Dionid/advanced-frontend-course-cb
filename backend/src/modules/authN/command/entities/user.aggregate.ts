import {createEntity, Entity} from "../../../../libs/dddfn/ddd";
import {Email} from "../../../../libs/dddfn/casualTypes";
import {HashedPassword} from "./password.vo";
import {v4} from "uuid";
import {createNominalPrimitive, Nominal, NominalObject, ReverseNominal} from "../../../../libs/nominal";

const UserIdToken = Symbol("UserId")
export type UserId = Nominal<string, typeof UserIdToken>
export const UserId = (() => {
  const _constructor = (value: string) => {
    return value as UserId
  }
  return {
    _constructor,
    new: () => {
      return _constructor(v4())
    }
  }
})()

const UserToken = Symbol("User")
export type User = Entity<typeof UserToken, UserId, {
  email: Email
  password: HashedPassword
}>
export const User = (() => {
  const _constructor = (values: ReverseNominal<User>) => {
    return NominalObject(
      values,
      UserToken,
    )
  }
  return {
    _constructor,
    create: (values: ReverseNominal<User>) => {
      return _constructor(values)
    }
  }
})()
