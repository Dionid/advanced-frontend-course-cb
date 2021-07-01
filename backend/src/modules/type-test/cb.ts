import {v4} from "uuid";

abstract class NominalObject<T> {
  constructor(
    public value: Readonly<T>,
  ) {}
}

abstract class NominalPrimitive<T> {
  constructor(
    public readonly value: T,
  ) {}
}


class String50 extends NominalPrimitive<string> {
  static create(value: string): String50 {
    if (value.length < 50) {
      throw new Error("String must be more than 50 symbols")
    }
    return new String50(value)
  }
}

class NotNegativeNumber extends NominalPrimitive<number> {
  static create(value: number): NotNegativeNumber {
    if (value < 0) {
      throw new Error("Number must be not negative")
    }
    return new NotNegativeNumber(value)
  }
}


type CartItemValue = Readonly<{
  id: string
  name: string
  price: NotNegativeNumber
}>
class CartItem extends NominalObject<CartItemValue>{
  private _!: never
  static create(value: CartItemValue): CartItem {
    return new CartItem(value)
  }
}

class EmptyCart extends NominalObject<{}> {
  private _!: never
  static create(): EmptyCart {
    return new EmptyCart({})
  }
}

class ActiveCart extends NominalObject<{
  unpaidItems: CartItem[],
  overallPrice: NotNegativeNumber,
}> {
  private _!: never

  static addItem(cart: ActiveCart, item: CartItem, addedPrice: number): ActiveCart {
    return new ActiveCart({
      overallPrice: NotNegativeNumber.create(cart.value.overallPrice.value + addedPrice),
      unpaidItems: [
        ...cart.value.unpaidItems,
        item,
      ]
    })
  }

  static empty() {
    return new ActiveCart({
      overallPrice: NotNegativeNumber.create(0),
      unpaidItems: []
    })
  }
}


class PaidCart {
  constructor(
    public value: Readonly<{
      paidItems: CartItem[],
      overallPrice: number,
    }>
  ) {}
}

type ShoppingCartState = EmptyCart | ActiveCart | PaidCart

class Cart {
  constructor(
    public value: Readonly<{
      id: string,
      state: ShoppingCartState,
    }>
  ) {}

  public static createNewCart(): Cart {
    return new Cart({
      id: v4(),
      state: EmptyCart.create(),
    })
  }

  public static addItem(cart: Cart, item: CartItem, addedPrice: number): Cart {
    if (cart.value.state instanceof ActiveCart) {
      return new Cart({
        ...cart.value,
        state: ActiveCart.addItem(cart.value.state, item, addedPrice),
      })
    } else if (cart.value.state instanceof EmptyCart) {
      const newState = ActiveCart.empty()
      return new Cart({
        ...cart.value,
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
    overallPrice: NotNegativeNumber.create(dbCart.overallPrice),
    unpaidItems: dbCart.items.map(i => new CartItem({
      ...i,
      price: NotNegativeNumber.create(i.price)
    })),
  })
  : dbCart.status === "PAID"
    ? new PaidCart({paidItems: dbCart.items.map(i => new CartItem({
        ...i,
        price: NotNegativeNumber.create(i.price)
      })), overallPrice: dbCart.overallPrice})
    : new EmptyCart({})

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
  return item.value.price.value
}

const newItem: CartItem = new CartItem({
  ...itemFromDB,
  price: NotNegativeNumber.create(itemFromDB.price)
})

const newCart = Cart.addItem(cart, newItem, calculateNewCartPrice(newItem))


const saveCart = (cart: Cart) => {
  let items: DBCartItem[]
  let status: "ACTIVE" | "PAID" | "EMPTY"
  let overallPrice: number
  if (cart.value.state instanceof ActiveCart) {
    status = "ACTIVE"
    items = cart.value.state.value.unpaidItems.map(item => ({...item.value, price: item.value.price.value}))
    overallPrice = cart.value.state.value.overallPrice.value
  } else if (cart.value.state instanceof PaidCart) {
    status = "PAID"
    items = cart.value.state.value.paidItems.map(item => ({...item.value, price: item.value.price.value}))
    overallPrice = cart.value.state.value.overallPrice
  } else {
    status = "EMPTY"
    items = []
    overallPrice = 0
  }
  const dbCart: DBCart = {
    id: cart.value.id,
    status,
    items,
    overallPrice,
  }
}

saveCart(newCart)




