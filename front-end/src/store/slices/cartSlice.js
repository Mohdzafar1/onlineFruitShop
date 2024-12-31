import { createSlice } from "@reduxjs/toolkit";


const initialState={
    error:false,
    loading:false,
    cartProduct:[],
}


const productCartSlice=createSlice({
    name:"Cart",
    initialState,
    reducers:{
         getCartProducts(state,action){
            if(action.payload){
             state.cartProduct.push(action.payload)
            }
         },
         
    }
})

export const {getCartProducts}=productCartSlice.actions
export default productCartSlice.reducer
