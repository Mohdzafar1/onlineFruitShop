import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import productCartSlice from "./slices/cartSlice";

export default configureStore({
    reducer:{
        products:productSlice,
        carts:productCartSlice
    }
})