import {Nominal, NominalObject, NominalToken, ReverseNominal} from "../../../../libs/nominal";

const PasswordToken = Symbol("Password")
export type Password = Nominal<string, typeof PasswordToken>
export const Password = (() => {
  const _constructor = (value: string) => {
    return value as Password
  }
  return {
    _constructor,
    create: (value: string) => {
      if (value.length < 5) {
        throw new Error("Password must be at least 5 symbols")
      }
      return _constructor(value)
    }
  }
})()

export type HashedPassword = Nominal<string, "HashedPassword">
export const HashedPassword = (() => {
  const _constructor = (value: string) => {
    return value as HashedPassword
  }
  return {
    _constructor,
    create: (password: Password): HashedPassword => {
      // TODO. hash it
      return _constructor(password)
    }
  }
})()





// const createConst = <T extends NominalObject<any, Token>, Token extends symbol | string>(token: Token): [
//   constructor: (values: ReverseNominal<T>) => T,
//   is: (value: Nominal<any, any>) => value is T,
// ] => {
//   return [
//     (values: ReverseNominal<T>): T => {
//       return NominalObject(values, token) as T
//     },
//     (value: Nominal<any, any>): value is T => {
//       return value[NominalToken] === token
//     },
//   ]
// }
