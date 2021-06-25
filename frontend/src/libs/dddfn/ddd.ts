import {Nominal} from "./index";

export type VO<Token, Type> = Readonly<Nominal<Type, Token>>
export type Entity<Token, ID, Type> = Readonly<Nominal<Type & { id: ID }, Token>>
