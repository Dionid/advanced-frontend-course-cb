import {Nominal} from "../../../../libs/nominal";

const PasswordToken = Symbol("Password")
export type Password = Nominal<string, typeof PasswordToken>
export const Password = (value: string): Password => {
    if (value.length < 5) {
      throw new Error("Password must be at least 5 symbols")
    }
    return value as Password
}

const HashedPasswordToken = Symbol("HashedPassword")
export type HashedPassword = Nominal<string, typeof HashedPasswordToken>
export const HashedPassword = (value: string): HashedPassword => {
  // TODO. Check if it is hashed
  // ...
  return value as HashedPassword
}
export const newHashedPassword = (password: Password): HashedPassword => {
  // TODO. salt and other stuff
  // ...
  const hash = password
  return HashedPassword(hash)
}
