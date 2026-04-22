import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        incrementCartProduct: (state, action) => {
            const { productId, variantId} = action.payload

            state.items = state.items.map(item => {
                const pId = item.productId || (item.product && item.product._id) || item.product;
                const vId = item.variantId || (item.variant && item.variant._id) || item.variant;
                if(pId === productId && vId === variantId){
                    return { ...item,quantity: item.quantity + 1}
                }else {
                    return item
                }
            })
        },
        decrementCartProduct: (state, action) => {
            const { productId, variantId} = action.payload

            state.items = state.items.map(item => {
                const pId = item.productId || (item.product && item.product._id) || item.product;
                const vId = item.variantId || (item.variant && item.variant._id) || item.variant;
                if(pId === productId && vId === variantId){
                    return { ...item,quantity: item.quantity - 1}
                }else {
                    return item
                }
            })
        },
        removeCartProduct: (state, action) => {
            const { productId, variantId} = action.payload

            state.items = state.items.filter(item => {
                const pId = item.productId || (item.product && item.product._id) || item.product;
                const vId = item.variantId || (item.variant && item.variant._id) || item.variant;
                return !(pId === productId && vId === variantId);
            })
        }
    }
})

export const { setItems, addItem, incrementCartProduct, decrementCartProduct, removeCartProduct } = cartSlice.actions;
export default cartSlice.reducer