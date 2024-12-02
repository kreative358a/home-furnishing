import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  checkoutItems: [],
  // numItemsInCheckout: 0,
  // cartTotal: 0,
  // shipping: 500,
  // orderTotal: 0,
};
const getCheckoutFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("checkout")) || defaultState;
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: getCheckoutFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { order } = action.payload;
      const item = state.checkoutItems.find(
        (i) => i.checkoutID === order.checkoutID
      );
      // if (item) {
      //   item.amount += product.amount;
      // } else {
      //   state.cartItems.push(product);
      // }
      state.checkoutItems.push(order);
      // state.numItemsInCart += product.amount;
      // state.cartTotal += product.price * product.amount;
      // localStorage.setItem("cart", JSON.stringify(state));
      // cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("checkout", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { checkoutID } = action.payload;
      const order = state.checkoutItems.find(
        (i) => i.checkoutID === checkoutID
      );
      state.checkoutItems = state.checkoutItems.filter(
        (i) => i.checkoutID !== checkoutID
      );
      // state.numItemsInCart -= product.amount;
      // state.cartTotal -= product.price * product.amount;
      // cartSlice.caseReducers.calculateTotals(state);
      toast.warning("Item removed from cart");
    },
    // editItem: (state, action) => {
    //   const { cartID, amount } = action.payload;
    //   const item = state.cartItems.find((i) => i.cartID === cartID);
    //   state.numItemsInCart += amount - item.amount;
    //   state.cartTotal += item.price * (amount - item.amount);
    //   item.amount = amount;
    //   cartSlice.caseReducers.calculateTotals(state);
    //   toast.info("Cart updated");
    // },
    // calculateTotals: (state) => {
    //   state.tax = 0.1 * state.cartTotal;
    //   state.orderTotal = state.cartTotal + state.shipping + state.tax;
    //   localStorage.setItem("cart", JSON.stringify(state));
    // },
  },
});

export const { addItem, clearCart, removeItem } = checkoutSlice.actions;

export default checkoutSlice.reducer;
