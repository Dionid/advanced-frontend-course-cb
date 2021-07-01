import {v4} from "uuid";


class String50 {
  constructor(
    public value: string
  ) {
    if (value.length < 50) {
      throw new Error("String must be more than 50 symbols")
    }
  }
}

class CartItem {
  constructor(
    public state: Readonly<{
      id: string
      name: string
      price: number
    }>
  ) {}
}

class EmptyCart {
  constructor(
    public state: Readonly<{}> = {}
  ) {}
}

class ActiveCart {
  constructor(
    public state: Readonly<{
      unpaidItems: CartItem[],
      overallPrice: number,
    }>
  ) {}

  static addItem(cart: ActiveCart, item: CartItem, addedPrice: number): ActiveCart {
    return new ActiveCart({
      overallPrice: cart.state.overallPrice + addedPrice,
      unpaidItems: [
        ...cart.state.unpaidItems,
        item,
      ]
    })
  }

  static empty() {
    return new ActiveCart({
      overallPrice: 0,
      unpaidItems: []
    })
  }
}


class PaidCart {
  constructor(
    public state: Readonly<{
      paidItems: CartItem[],
      overallPrice: number,
    }>
  ) {}
}

type ShoppingCartState = EmptyCart | ActiveCart | PaidCart

class Cart {
  constructor(
    public state: Readonly<{
      id: string,
      state: ShoppingCartState,
    }>
  ) {}

  public static createNewCart(): Cart {
    return new Cart({
      id: v4(),
      state: new EmptyCart(),
    })
  }

  public static addItem(cart: Cart, item: CartItem, addedPrice: number): Cart {
    if (cart.state.state instanceof ActiveCart) {
      return new Cart({
        ...cart.state,
        state: ActiveCart.addItem(cart.state.state, item, addedPrice),
      })
    } else if (cart.state.state instanceof EmptyCart) {
      const newState = ActiveCart.empty()
      return new Cart({
        ...cart.state,
        state: ActiveCart.addItem(newState, item, addedPrice),
      })
    }
    throw new Error("You can't add items to paid cart")
  }
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
  ? new ActiveCart({
    overallPrice: dbCart.overallPrice,
    unpaidItems: dbCart.items.map(i => new CartItem(i)),
  })
  : dbCart.status === "PAID"
    ? new PaidCart({paidItems: dbCart.items.map(i => new CartItem(i)), overallPrice: dbCart.overallPrice})
    : new EmptyCart()

const cart: Cart = new Cart({
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

const calculateNewCartPrice = (item: CartItem): number => {
  return item.state.price
}

const newItem: CartItem = new CartItem(itemFromDB)

const newCart = Cart.addItem(cart, newItem, calculateNewCartPrice(newItem))


const saveCart = (cart: Cart) => {
  let items: DBCartItem[]
  let status: "ACTIVE" | "PAID" | "EMPTY"
  let overallPrice: number
  if (cart.state.state instanceof ActiveCart) {
    status = "ACTIVE"
    items = cart.state.state.state.unpaidItems.map(item => ({...item.state}))
    overallPrice = cart.state.state.state.overallPrice
  } else if (cart.state.state instanceof PaidCart) {
    status = "PAID"
    items = cart.state.state.state.paidItems.map(item => ({...item.state}))
    overallPrice = cart.state.state.state.overallPrice
  } else {
    status = "EMPTY"
    items = []
    overallPrice = 0
  }
  const dbCart: DBCart = {
    id: cart.state.id,
    status,
    items,
    overallPrice,
  }
}

saveCart(newCart)




