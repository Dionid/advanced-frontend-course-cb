import {isNominalObject, Nominal, NominalObject, NominalToken} from "../nominal";

export type VO<T, Token extends symbol> = NominalObject<T, Token>
export const VO = NominalObject
export const isVO = isNominalObject

export const createVO = <T, Token extends symbol>(token: Token): [
  vo: (values: T) => VO<T, Token>,
  isVO: (values: NominalObject<any, any>) => values is T,
] => {
  return [
    (values: T) => VO(values, token),
    (value: Nominal<any, any>): value is T => value[NominalToken] === token
  ]
}

// TODO. Fix id name
export type Entity<
  Token extends symbol,
  IDV,
  Type,
> = VO<Type & { id: IDV }, Token>
export const Entity = <Token extends symbol, T, IDV>(token: Token, idValue: IDV, values: T): Entity<Token, IDV, T> => {
  return VO({
      ...values,
      id: idValue,
  }, token)
}
export const createEntity = <T, Token extends symbol, IDV>(token: Token, idValue: IDV): [
  entity: (values: T) => Entity<Token, IDV, T>,
  isVO: (values: NominalObject<any, any>) => values is T,
] => {
  return [
    (values: T) => Entity(token, idValue, values),
    (value: Nominal<any, any>): value is T => value[NominalToken] === token
  ]
}
