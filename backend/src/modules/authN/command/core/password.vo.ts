import {Nominal} from "../../../../libs/dddfn";

const PasswordToken = Symbol("Password")
export type Password = Nominal<string, typeof PasswordToken>
export const isPassword = (value: string): value is Password => {
  if (value.length < 5) {
    throw new Error("Password must be at least 5 symbols")
  }
  return true
}
export const Password = (value: string): Password => {
  if (!isPassword(value)) {
    throw new Error("")
  }
  return value
}

const HashedPasswordToken = Symbol("HashedPassword")
export type HashedPassword = Nominal<string, typeof HashedPasswordToken>
export const isHashedPassword = (value: string): value is HashedPassword => {
  // TODO. Check if it is hashed
  // ...
  return true
}
export const HashedPassword = (value: string): HashedPassword => {
  // TODO. Check
  if (!isHashedPassword(value)) {
    throw new Error("Type is not hashedpassword")
  }
  return value
}
export const newHashedPassword = (password: Password): HashedPassword => {
  // TODO. salt and other stuff
  // ...
  const hash = password
  return HashedPassword(hash)
}
