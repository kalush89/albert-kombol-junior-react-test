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

const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };
  
export const loadFromLocalStorage = () => {
    try {
      const stateStr = localStorage.getItem('state');
      return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const persistedStore = loadFromLocalStorage();

export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger()),
    preloadedState: persistedStore,
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

