import { createSlice } from "@reduxjs/toolkit";


const initialState={
    error:false,
    loading:false,
    productAll:[],
    productFilterAll:[]

}


const productSlice=createSlice({
    name:"Product",
    initialState,
    reducers:{
         getAllProducts(state,action){
            state.productAll=action.payload
         },
         getAllFilterProducts(state,action){
            state.productFilterAll=action.payload
         }

    }
})

export const {getAllProducts,getAllFilterProducts}=productSlice.actions
export default productSlice.reducer
