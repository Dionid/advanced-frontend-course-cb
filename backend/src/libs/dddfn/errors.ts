
export type SimpleResult<E = Error> = E | undefined
export type SimpleResultP<E = Error> = Promise<SimpleResult<E>>

export type Result<T, E = Error> = [T] | [undefined, E]
export type ResultP<T, E = Error> = Promise<Result<T, E>>
