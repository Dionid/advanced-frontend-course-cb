import {Nominal} from "../nominal";

// const TestObjectToken: unique symbol = Symbol("TestObject")
// type TestObject = ReturnType<typeof TestObject>
// const [TestObject, isTestObject] = createNominalObject<{
//   unpaidItems: string[],
//   overallPrice: number,
// }, typeof TestObjectToken>(TestObjectToken)
//
// const tc = TestObject({
//   unpaidItems: [],
//   overallPrice: 0,
// })
//
// const TestObjectSToken: unique symbol = Symbol("TestObjectS")
// type TestObjectS = ReturnType<typeof TestObjectS>
// const [TestObjectS, isTestObjectS] = createNominalObject<{
//   unpaidItems: string[],
//   overallPrice: number,
//   test: string,
// }, typeof TestObjectSToken>(TestObjectSToken)
//
// const tcs = TestObjectS({
//   unpaidItems: [],
//   overallPrice: 0,
//   test: ""
// })

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


