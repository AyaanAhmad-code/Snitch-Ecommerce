import { addItem, getCart, incrementCartItem, decrementCartItem, removeCartItem } from "../service/cart.api.js"
import { useDispatch } from "react-redux"
import {incrementCartProduct, setCart,decrementCartProduct, removeCartProduct } from "../state/cart.slice"

export const useCart = () => {
    const dispatch = useDispatch();

    async function handleAddItem({productId,variantId}){
        const data = await addItem({productId,variantId})
        await handleGetCart()
        return data
    }

    async function handleGetCart(){
        const data = await getCart()
        dispatch(setCart(data.cart))
    }

    async function handleIncrementCartItem({productId,variantId}){
        const data = await incrementCartItem({productId, variantId})
        dispatch(incrementCartProduct({productId, variantId}))
    }

    async function handleDecrementCartItem({productId,variantId}){
        const data = await decrementCartItem({productId, variantId})
        dispatch(decrementCartProduct({productId, variantId}))
    }

    async function handleRemoveCartItem({productId,variantId}){
        await removeCartItem({productId, variantId})
        dispatch(removeCartProduct({productId, variantId}))
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem }
}