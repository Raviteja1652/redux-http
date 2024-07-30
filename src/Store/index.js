// import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from './toggle-slice';
import cartReducer from './cart-slice'

const store = configureStore({
    reducer: { toggle: toggleReducer, cart: cartReducer }
});

export default store;