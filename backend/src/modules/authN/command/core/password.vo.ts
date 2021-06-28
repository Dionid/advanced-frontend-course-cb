import {Nominal} from "../../../../libs/dddfn";

export type Password = Nominal<string, "Password">
export const isPassword = (value: string): value is Password => {
  if (value.length < 5) {
    throw new Error()
  }
  return true
}
export const Password = (value: string): Password => {
  if (!isPassword(value)) {
    throw new Error("")
  }
  return value
}

export type HashedPassword = Nominal<string, "HashedPassword">
export const isHashedPassword = (value: string): value is HashedPassword => {
  // TODO. check hashes
  return true
}
export const HashedPassword = (value: string): HashedPassword => {
  // TODO. hash
  if (!isHashedPassword(value)) {
    throw new Error("")
  }
  return value
}
