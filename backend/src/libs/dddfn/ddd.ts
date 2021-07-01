import {createNominalObject, isNominalObject, Nominal, NominalObject, NominalToken} from "../nominal";

export type VO<T, Token extends symbol | string> = NominalObject<T, Token>
export const VO = NominalObject
export const isVO = isNominalObject
export const createVO = <T, Token extends symbol | string>(token: Token): [
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
  Token extends symbol | string,
  IDV,
  Type,
> = VO<Type & { id: IDV }, Token>
export const Entity = <Token extends symbol | string, T, IDV>(token: Token, values: T & {id: IDV}): Entity<Token, IDV, T> => {
  return VO(values, token)
}
export const createEntity = <T, IDV> () => <Token extends symbol | string>(token: Token): [
  entity: (values: T & { id: IDV}) => Entity<Token, IDV, T>,
  isVO: (values: NominalObject<any, any>) => values is T,
] => {
  return [
    (values: T & { id: IDV}) => Entity(token, values),
    (value: Nominal<any, any>): value is T => value[NominalToken] === token
  ]
}
