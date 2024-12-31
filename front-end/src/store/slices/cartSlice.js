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
         addToCart: (state, action) => {
          const existingProduct = state.cartProduct.find(
            (item) => item._id === action.payload._id
          );
          if (existingProduct) {
            existingProduct.qty += 1;
          } else {
            state.cartProduct.push({ ...action.payload, qty: 1 });
          }
        },
        updateQuantity: (state, action) => {
          const { productId, qty } = action.payload;
          const product = state.cartProduct.find((item) => item._id === productId);
          if (product) {
            product.qty = qty;
          }
        },
         deleteProductReducer(state, action) {
            const productIdToRemove = action.payload;
            state.cartProduct = state.cartProduct.filter(
              (product) => product?._id !== productIdToRemove
            );
          },
         
    }
})

export const {getCartProducts,deleteProductReducer,addToCart,updateQuantity}=productCartSlice.actions
export default productCartSlice.reducer
