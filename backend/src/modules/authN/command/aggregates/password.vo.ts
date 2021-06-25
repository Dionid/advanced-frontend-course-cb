import {Nominal} from "../../../../libs/dddfn";



export type Password = Nominal<string, "Password">
export const Password = (value: string): Password => {
  if (value.length < 5) {
    throw new Error("")
  }
  return value as Password
}

export type HashedPassword = Nominal<string, "HashedPassword">
export const HashedPassword = (value: string): HashedPassword => {
  // TODO. hash
  return value as HashedPassword
}
