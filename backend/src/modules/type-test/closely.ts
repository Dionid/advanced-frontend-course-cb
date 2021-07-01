export const NominalToken = Symbol("__TYPE__")
type Nominal<T, Token extends symbol | string> = T & { readonly [NominalToken]: Token }
type ReverseNominal<T> = Omit<T, typeof NominalToken>

type NominalObject<T, Token extends symbol | string> = Readonly<Nominal<T, Token>>
const NominalObject = <T, Token extends symbol | string>(values: T, token: Token): NominalObject<T, Token> => {
  return {
    ...values,
    [NominalToken]: token,
  }
}
const isNominalObject = <T, Token extends symbol | string>(value: Nominal<any, any>, token: Token): value is T => {
  return value[NominalToken] === token
}

const createNominalObject = <T>() => <Token extends symbol | string>(extToken: Token): [
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

const createNominalPrimitive = <T, Token extends symbol | string>(): (values: T) => NominalObject<T, Token> => {
  return (values: T) => values as Nominal<T, Token>
}

type String50 = ReturnType<typeof String50>
const String50 = createNominalPrimitive<string, "String50">()
const createString50 = (value: string): String50 => {
  return String50(value)
}

type String30 = ReturnType<typeof String30>
const String30 = createNominalPrimitive<string, "String30">()
const createString30 = (value: string): String30 => {
  return String30(value)
}

// const s: String50 = String30("sd")


type Cart = ReturnType<typeof Cart>
const [Cart, isCart] = createNominalObject<{
  items: string[],
  price: number,
}>()("CartToken")
const createCart = (values: Cart): Cart => {
  return Cart(values)
}

const c = Cart({items: [], price: 0})

type EmptyCart = ReturnType<typeof EmptyCart>
const [EmptyCart, isEmptyCart] = createNominalObject<{
  items: string[],
  price: number
}>()("EmptyCart")
const createEmptyCart = (values: EmptyCart): EmptyCart => {
  return EmptyCart(values)
}

const ec = EmptyCart({items: [], price: 0})

// const testc: EmptyCart = Cart({items: [], price: 0}) // Error as expected


// const createNominal = <T, Token extends symbol>(extToken: Token): [
//   nominal: (values: T) => Nominal<T, Token>,
//   isNominal: (values: Nominal<any, any>) => values is T,
// ] => {
//   // const token = extToken || Symbol("")
//   return [
//     (values: T) => Nominal(values, extToken),
//     (values: Nominal<any, any>): values is T => isNominal(extToken)(values),
//   ]
// }
//
// const CartToken = Symbol("")
// const [Cart, isCart] = createNominal<{
//   items: string[],
//   price: number
// }, typeof CartToken>(CartToken)
// type Cart = ReturnType<typeof Cart>
// let c: Cart = Cart({
//   items: [],
//   price: 0,
// })

// const EmptyCartToken = Symbol("")
// const [EmptyCart, isEmptyCart] = createNominal<{
//   items: string[],
//   price: number
// }, typeof EmptyCartToken>(EmptyCartToken)
// type EmptyCart = ReturnType<typeof EmptyCart>
//
// let e: Cart = EmptyCart({
//   items: [],
//   price: 0,
// })

// 2 ---- OPTIONAL SYMBOL

// const createNominal = <T, Token extends symbol = symbol>(): [
//   nominal: (values: T) => Nominal<T, Token>,
//   isNominal: (values: Nominal<any, any>) => values is T,
// ] => {
//   const token = Symbol("") as Token
//   return [
//     (values: T) => Nominal(values, token),
//     (values: Nominal<any, any>): values is T => isNominal(token)(values),
//   ]
// }
//
// const CartToken = Symbol("")
// const [Cart, isCart] = createNominal<{
//   items: string[],
//   price: number
// }>()
// type Cart = ReturnType<typeof Cart>
// let c: Cart = Cart({
//   items: [],
//   price: 0,
// })
//
// const EmptyCartToken = Symbol("")
// const [EmptyCart, isEmptyCart] = createNominal<{
//   items: string[],
//   price: number
// }>()
// type EmptyCart = ReturnType<typeof EmptyCart>
//
// let e: Cart = EmptyCart({
//   items: [],
//   price: 0,
// })


// 3 --- Hack on top of proto

// const createNominal = <T>(): [
//   (values: T) => T,
//   (value: any) => value is T,
// ] => {
//   function nominal(values: T): T {
//     // @ts-ignore
//     values.__proto__ = nominal.prototype
//     return values
//   }
//   function isNominal(value: any): value is T {
//     return value instanceof nominal
//   }
//   return [nominal, isNominal]
// }
//
// type Cart = ReturnType<typeof Cart>
// const [Cart, isCart] = createNominal<{ items: [] }>()
//
// const c = Cart({items: []})
// if (isCart(c)) {
//   console.log("WORKS")
// }
//
// type SCart = ReturnType<typeof SCart>
// const [SCart, isSCart] = createNominal<{ items: [] }>()
//
// const sc: Cart = SCart({items: []})
// if (isCart(sc)) {
//   console.log("MUST NOT")
// }
// if (isSCart(sc)) {
//   console.log("MUST WORK")
// }

// 4 --- WORKS --- hack with string

// const createNominal = <T, Token extends symbol | string>(): [
//   nominal: (values: T) => NominalObject<T, Token>,
//   isNominal: (values: NominalObject<any, any>) => values is T,
// ] => {
//   const token = Symbol("") as Token
//   return [
//     (values: T) => NominalObject(values, token),
//     (value: NominalObject<any, any>): value is T => isNominalObject(value, token),
//   ]
// }
//
// const [Cart, isCart] = createNominal<{
//   items: string[],
//   price: number
// }, "Cart">()
// type Cart = ReturnType<typeof Cart>
//
//
// type EmptyCart = ReturnType<typeof EmptyCart>
// const [EmptyCart, isEmptyCart] = createNominal<{
//   items: string[],
//   price: number
// }, "EmptyCart">()
// const createEmptyCart = (values: EmptyCart): EmptyCart => {
//   return EmptyCart(values)
// }

