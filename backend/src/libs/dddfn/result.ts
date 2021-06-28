
export type SimpleResult<E = Error> = E | undefined
export type SimpleResultP<E = Error> = Promise<SimpleResult<E>>

export type Ok<T> = T
export type Err<E extends Error> = E

export type Result<T, E extends Error> = Ok<T> | Err<E>
export type ResultP<T, E extends Error> = Promise<Result<T, E>>

export function isErr<T, E extends Error>(result: Result<T, E>): result is Err<E> {
  return result instanceof Error
}
