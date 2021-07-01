
export const NominalToken = Symbol("__TYPE__")
export type Nominal<T, Token extends symbol> = T & { readonly [NominalToken]: Token }
export type ReverseNominal<T> = Omit<T, typeof NominalToken>

export type NominalObject<T, Token extends symbol> = Readonly<Nominal<T, Token>>
export const NominalObject = <T, Token extends symbol>(values: T, token: Token): NominalObject<T, Token> => {
  return {
    ...values,
    [NominalToken]: token,
  }
}
export const isNominalObject = <T, Token extends symbol>(value: Nominal<any, any>, token: Token): value is T => {
  return value[NominalToken] === token
}
export const createNominalObject = <T, Token extends symbol>(token: Token): [
  nominal: (values: T) => Nominal<T, Token>,
  isNominal: (values: NominalObject<any, any>) => values is T,
] => {
  return [
    (values: T) => NominalObject(values, token),
    (value: Nominal<any, any>): value is T => value[NominalToken] === token
  ]
}
