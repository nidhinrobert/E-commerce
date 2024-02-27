import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice"
import ProductSlice from "./ProductSlice";
import CartSlice from "./CartSlice";
import AdminSlice from "./AdminSlice";



const store = configureStore({
    reducer: {
        item : slice,
        productItem :ProductSlice,
        cartItem:CartSlice,
        admin:AdminSlice,
    }
})
export default store