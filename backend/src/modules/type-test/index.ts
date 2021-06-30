import {v4} from "uuid";

export const NominalToken = Symbol("__TYPE__")
export type NNominal<T, Token extends symbol> = T & { readonly [NominalToken]: Token }
const NNominal = <T, Token extends symbol>(values: T, token: Token): NNominal<T, Token> => {
  return {
    ...values,
    [NominalToken]: token,
  }
}
export type ReverseNNominal<T> = Omit<T, typeof NominalToken>

export type NVO<T, Token extends symbol> = Readonly<NNominal<T, Token>>
export const NVO = <T, Token extends symbol>(values: T, token: Token): NVO<T, Token> => {
  return NNominal(values, token)
}

const String50Token = Symbol("")
type String50 = NNominal<string, typeof String50Token>
const String50 = (value: string): String50 => {
  if (value.length < 50) {
    throw new Error("...")
  }
  return value as String50
}

const CartItemToken: unique symbol = Symbol("CartItem")
export type CartItem = NVO<{
  id: string
  name: string
  price: number
}, typeof CartItemToken>
export const isCartItem = (value: NVO<any, any>): value is CartItem => {
  return value.__TYPE__ === CartItemToken
}
const CartItem = (
  value: ReverseNNominal<CartItem>,
): CartItem => {
  return NNominal(value, CartItemToken)
}

const EmptyCartToken: unique symbol = Symbol("EmptyCart")
export type EmptyCart = NVO<{}, typeof EmptyCartToken>
export const isEmptyCart = (value: NVO<any, any>): value is EmptyCart => {
  return value.__TYPE__ === EmptyCartToken
}
const EmptyCart = (): EmptyCart => {
  return NVO({}, EmptyCartToken)
}

const ActiveCartToken: unique symbol = Symbol("ActiveCart")
export type ActiveCart = NVO<{ unpaidItems: CartItem[], overallPrice: number }, typeof ActiveCartToken>
export const isActiveCart = (value: NVO<any, any>): value is ActiveCart => {
  return value.__TYPE__ === ActiveCartToken
}
const ActiveCart = (value: ReverseNNominal<ActiveCart>): ActiveCart => {
  return NVO(value, ActiveCartToken)
}
const ActiveCartEmpty = (value: ReverseNNominal<ActiveCart> = {unpaidItems: [], overallPrice: 0}): ActiveCart => {
  return NVO(value, ActiveCartToken)
}

const addItemToActiveCart = (state: ActiveCart, item: CartItem): ActiveCart => {
  return ActiveCart({
    overallPrice: state.overallPrice + item.price,
    unpaidItems: [
      ...state.unpaidItems,
      item,
    ]
  })
}


const PaidCartToken: unique symbol = Symbol("PaidCart")
export type PaidCart = NVO<{ paidItems: CartItem[]; overallPrice: number }, typeof PaidCartToken>
export const isPaidCart = (value: NVO<any, any>): value is PaidCart => {
  return value.__TYPE__ === PaidCartToken
}
const PaidCart = (values: ReverseNNominal<PaidCart>): PaidCart => {
  return NVO(values, PaidCartToken)
}

type ShoppingCartState = EmptyCart | ActiveCart | PaidCart

const ShoppingCartToken = Symbol("ShoppingCart")

type ShoppingCart = NVO<{
  id: string
  state: ShoppingCartState
}, typeof ShoppingCartToken>

const ShoppingCart = (values: ReverseNNominal<ShoppingCart>): ShoppingCart => {
  return NVO(values, ShoppingCartToken)
}

const addItem = (cart: ShoppingCart, item: CartItem): ShoppingCart => {
  if (isActiveCart(cart.state)) {
    return {
      ...cart,
      state: addItemToActiveCart(cart.state, item),
    }
  } else if (isEmptyCart(cart.state)) {
    const newState = ActiveCartEmpty()
    return {
      ...cart,
      state: addItemToActiveCart(newState, item),
    }
  }
  throw new Error("You can't add items to paid cart")
}

type DBCartItem = {
  id: string
  name: string
  price: number
}

type DBCart = {
  id: string,
  status: "ACTIVE" | "PAID" | "EMPTY",
  items: DBCartItem[]
  overallPrice: number
}

const dbCart: DBCart = {
  id: v4(),
  status: "ACTIVE",
  overallPrice: 200,
  items: [
    {
      id: v4(),
      name: "First item",
      price: 100,
    },
    {
      id: v4(),
      name: "Second item",
      price: 100,
    }
  ],
}

let state: ShoppingCartState = dbCart.status === "ACTIVE"
  ? ActiveCart({
    overallPrice: dbCart.overallPrice,
    unpaidItems: dbCart.items.map(i => CartItem(i)),
  })
  : dbCart.status === "PAID"
    ? PaidCart({paidItems: dbCart.items.map(i => CartItem(i)), overallPrice: dbCart.overallPrice})
    : EmptyCart()

const cart: ShoppingCart = ShoppingCart({
  id: dbCart.id,
  state,
})

const itemFromQuery = {
  id: v4(),
}

const itemFromDB = {
  id: itemFromQuery.id,
  name: "Other item",
  price: 1000
}

const newItem: CartItem = CartItem(itemFromDB)

const newCart = addItem(cart, newItem)

const saveCart = (cart: ShoppingCart) => {
  let items: CartItem[]
  let status: "ACTIVE" | "PAID" | "EMPTY"
  let overallPrice: number
  if (isActiveCart(cart.state)) {
    status = "ACTIVE"
    items = cart.state.unpaidItems
    overallPrice = cart.state.overallPrice
  } else if (isPaidCart(cart.state)) {
    status = "PAID"
    items = cart.state.paidItems
    overallPrice = cart.state.overallPrice
  } else {
    status = "EMPTY"
    items = []
    overallPrice = 0
  }
  const dbCart: DBCart = {
    id: cart.id,
    status,
    items,
    overallPrice,
  }
}

saveCart(newCart)

// const cart: ShoppingCart = EmptyCart()
// const newCart = addItem(cart, "newItem")



