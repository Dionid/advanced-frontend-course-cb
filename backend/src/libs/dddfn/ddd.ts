import {Nominal} from "./index";

export type Entity<
  Token extends symbol,
  IDV,
  Type,
> = Readonly<Nominal<Type & { id: IDV }, Token>>
export const Entity = <Token extends symbol, T, IDV>(token: Token, idValue: IDV, values: T): Entity<Token, IDV, T> => {
  return Nominal({
      ...values,
      id: idValue,
  }, token)
}

export type VO<T, Token extends symbol> = Readonly<Nominal<T, Token>>
export const VO = <T, Token extends symbol>(values: T, token: Token): VO<T, Token> => {
  return Nominal(values, token)
}
