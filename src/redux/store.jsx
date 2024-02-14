import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice"
import ProductSlice from "./ProductSlice";



const store = configureStore({
    reducer: {
        item : slice,
        productItem :ProductSlice,
    }
})
export default store