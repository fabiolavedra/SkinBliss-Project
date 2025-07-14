import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cartSlice";
import compareSlice from "./features/compareSlice";
import productModalSlice from "./features/productModalSlice";
import shopFilterSlice from "./features/shop-filter-slice";
import wishlistSlice from "./features/wishlist-slice";
import couponSlice from "./features/coupon/couponSlice";
import orderSlice from "./features/order/orderSlice";
import quizModalSlice from "./features/quizModalSlice";

const appReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  productModal: productModalSlice,
  shopFilter: shopFilterSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  compare: compareSlice,
  coupon: couponSlice,
  order: orderSlice,
  quizModal: quizModalSlice,
};

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    // Clear localStorage
    localStorage.removeItem("cart_products");
    localStorage.removeItem("wishlist_items");
    localStorage.removeItem("compare_items");
    localStorage.removeItem("couponInfo");
    localStorage.removeItem("shipping_info");

    // Reset all slices to initial state
    const resetState = {};
    Object.keys(appReducer).forEach((key) => {
      resetState[key] = appReducer[key](undefined, action);
    });
    return resetState;
  }

  // Normal reducer behavior
  return Object.keys(appReducer).reduce((acc, key) => {
    acc[key] = appReducer[key](state?.[key], action);
    return acc;
  }, {});
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
