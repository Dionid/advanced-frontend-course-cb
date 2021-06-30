
// export type Flavor<Type, Token> = Type & { readonly __FLAVOR_TYPE_TOKEN__?: Token }
// export type ReverseFlavor<T> = Omit<T, "__FLAVOR_TYPE_TOKEN__">


export const NominalToken = Symbol("__TYPE__")
export type Nominal<T, Token extends symbol> = T & { readonly [NominalToken]: Token }
export const Nominal = <T, Token extends symbol>(values: T, token: Token): Nominal<T, Token> => {
  return {
    ...values,
    [NominalToken]: token,
  }
}
export const isNominal = <T>(token: symbol) => (value: Nominal<any, any>): value is T => {
  return value[NominalToken] === token
}
export type ReverseNominal<T> = Omit<T, typeof NominalToken>

const ValidatorToken = Symbol("")
export type Validator<T, Token extends string, E extends Error> = Nominal<(ctx: T) => E[], typeof ValidatorToken>
export const Validator = <T, E extends Error = Error, Token extends string = "">(
  validator: (ctx: T) => E[],
): Validator<T, Token, E> => {
  return validator as Validator<T, Token, E>
}

const PermissionCheckerToken = Symbol("")
export type PermissionChecker<T, Token extends string, E extends Error> = Nominal<(ctx: T) => E[], typeof PermissionCheckerToken>
export const PermissionChecker = <T, E extends Error = Error, Token extends string = "">(
  checker: (ctx: T) => E[],
): PermissionChecker<T, Token, E> => {
  return checker as PermissionChecker<T, Token, E>
}

// const isTaskValid = Validator<{id: string}>((ctx): Error[] => {
//   return []
// })
//
// function testValidators<T extends { id: string }, Token extends string>(validator: Validator<T, Token, Error>) {}
// testValidators(isTaskValid)
// testValidators(canEditTask) // Error
//
// const canEditTask = PermissionChecker<{id: string}>((ctx: {id: string}): Error[] => {
//   return []
// })
// const canErr = canEditTask({id: "asd"})
//
// function testPChecker<T extends { id: string }, Token extends string>(checker: PermissionChecker<T, Token, Error>) {}
//
// testPChecker(canEditTask)
// testPChecker(isTaskValid) // Error


