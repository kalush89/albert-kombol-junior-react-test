import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import categorySlice from "./categorySlice";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

const combinedReducer = combineReducers({
    categorySlice,
    currencySlice,
    cartSlice,
    productSlice,
});

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
});


