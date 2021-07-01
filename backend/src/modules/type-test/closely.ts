
export const NominalToken = Symbol("__TYPE__")
type Nominal<T, Token extends symbol> = T & { readonly [NominalToken]: Token }
const Nominal = <T, Token extends symbol>(values: T, token: Token): Nominal<T, Token> => {
  return {
    ...values,
    [NominalToken]: token,
  }
}
const isNominal = <T>(token: symbol) => (value: Nominal<any, any>): value is T => {
  return value[NominalToken] === token
}

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
//
// let c: Cart = Cart({
//   items: [],
//   price: 0,
// })
//
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

const createNominal = <T>(): [
  nominal: (values: T) => Nominal<T, typeof token>,
  isNominal: (values: Nominal<any, any>) => values is T,
  token: typeof token,
] => {
  const token: symbol = Symbol("")
  return [
    (values: T) => Nominal(values, token),
    (values: Nominal<any, any>): values is T => isNominal(token)(values),
    token,
  ]
}

const [Cart, isCart] = createNominal<{
  items: string[],
  price: number
}>()
type Cart = ReturnType<typeof Cart>

let c: Cart = Cart({
  items: [],
  price: 0,
})

const [EmptyCart, isEmptyCart] = createNominal<{
  items: string[],
  price: number
}>()
type EmptyCart = ReturnType<typeof EmptyCart>

let e: Cart = EmptyCart({
  items: [],
  price: 0,
})
