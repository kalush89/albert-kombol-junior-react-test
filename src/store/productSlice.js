import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    selectedImage: "",
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedImage: (state, action) => {
            state.selectedImage = action.payload;
        }
    },

})


export const { setSelectedImage } = productSlice.actions

export default productSlice.reducer