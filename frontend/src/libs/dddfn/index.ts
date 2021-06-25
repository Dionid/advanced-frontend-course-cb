
export type Flavor<Type, Token> = Type & { readonly __FLAVOR_TYPE_TOKEN__?: Token }
export type ReverseFlavor<T> = Omit<T, "__FLAVOR_TYPE_TOKEN__">

export type Nominal<Type, Token> = Type & { readonly __NOMINAL_TYPE_TOKEN__: Token }
export type ReverseNominal<T> = Omit<T, "__NOMINAL_TYPE_TOKEN__">

export type Validator<T, Token extends string, E extends Error = Error> = Nominal<(ctx: T) => E[], `validator_${Token}`>
export const Validator = <T, E extends Error = Error, Token extends string = "">(
  validator: (ctx: T) => E[],
): Validator<T, Token, E> => {
  return validator as Validator<T, Token, E>
}

export type PermissionChecker<T, Token extends string, E extends Error = Error> = Nominal<(ctx: T) => E[], `permissionChecker_${Token}`>
export const PermissionChecker = <T, E extends Error = Error, Token extends string = "">(
  checker: (ctx: T) => E[],
): PermissionChecker<T, Token, E> => {
  return checker as PermissionChecker<T, Token, E>
}

// const isTaskValid = Validator<{id: string}>((ctx): Error[] => {
//   return []
// })
//
// function testValidators<T extends { id: string }, Token extends string>(validator: Validator<T, Token>) {}
// testValidators(isTaskValid)
// testValidators(canEditTask) // Error
//
// const canEditTask = PermissionChecker<{id: string}>((ctx: {id: string}): Error[] => {
//   return []
// })
// const canErr = canEditTask({id: "asd"})
//
// function testPChecker<T extends { id: string }, Token extends string>(checker: PermissionChecker<T, Token>) {}
//
// testPChecker(canEditTask)
// testPChecker(isTaskValid) // Error


