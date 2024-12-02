import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
// import checkoutReducer from './features/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    // checkoutState: checkoutReducer,
  },
});
