import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";


export default configureStore({
    reducer:{
        products:productSlice
    }
})