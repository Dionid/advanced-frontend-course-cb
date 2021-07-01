
export const NominalToken = Symbol("__TYPE__")
export type Nominal<T, Token extends symbol | string> = T & { readonly [NominalToken]: Token }
export type ReverseNominal<T> = Omit<T, typeof NominalToken>

export type NominalObject<T, Token extends symbol | string> = Readonly<Nominal<T, Token>>
export const NominalObject = <T, Token extends symbol | string>(values: T, token: Token): NominalObject<T, Token> => {
  return {
    ...values,
    [NominalToken]: token,
  }
}
export const isNominalObject = <T, Token extends symbol | string>(value: Nominal<any, any>, token: Token): value is T => {
  return value[NominalToken] === token
}

export const createNominalObject = <T>() => <Token extends symbol | string>(extToken: Token): [
  nominal: (values: T) => NominalObject<T, Token>,
  isNominal: (values: NominalObject<any, any>) => values is T,
  token: Token,
] => {
  const token = typeof extToken === "string" ? Symbol(extToken) as Token : extToken
  return [
    (values: T) => NominalObject(values, token),
    (value: NominalObject<any, any>): value is T => isNominalObject(value, token),
    token,
  ]
}

export const createNominalPrimitive = <T, Token extends symbol | string>(): (values: T) => NominalObject<T, Token> => {
  return (values: T) => values as Nominal<T, Token>
}

