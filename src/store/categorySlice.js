import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories, getCategoryDetails } from "../utils/tilework.utils";

// First, create the thunk
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
     async () => {
      const response = await getCategories();
      return response
    }
  )

  export const fetchCategoryDetails = createAsyncThunk(
    'cartegory-details/fetchCategoryDetails',
     async (category) => {
      const response = await getCategoryDetails(category);
      return response
    }
  )

const initialState = { 
    categories:[],
    categoryDetails: [],
    activeCategory: "all",
    
}

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.categories = action.payload.categories
        })

        .addCase(fetchCategoryDetails.fulfilled, (state, action) =>{
            state.categoryDetails = action.payload.category
        })
    }
})

export const { setActiveCategory } = categorySlice.actions

export default categorySlice.reducer

