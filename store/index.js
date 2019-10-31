import { createStore } from "redux"
import cartItems from "../reducers/cartItems"

export const storeA = createStore(cartItems)

