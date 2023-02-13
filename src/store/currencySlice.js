import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies } from "../utils/tilework.utils";

export const fetchCurrencies = createAsyncThunk(
    'currencies/fetchCurrencies',
     async () => {
      const response = await getCurrencies();
      return response
    }
  )

const initialState = { 
    currencies: [],
    selectedCurrency: ['$', 'USD'],
    
}

export const currencySlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        setSelectedCurrency: (state, action) => {
            state.selectedCurrency = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
            state.currencies = [...action.payload.currencies]
          })
    }
})


export const { setSelectedCurrency } = currencySlice.actions

export default currencySlice.reducer