import { addItem, getCart, incrementCartItem, decrementCartItem, removeCartItem, createCartOrder, verifyCartOrder } from "../service/cart.api.js"
import { useDispatch } from "react-redux"
import { setCart } from "../state/cart.slice"

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
        await incrementCartItem({productId, variantId})
        await handleGetCart()
    }

    async function handleDecrementCartItem({productId,variantId}){
        await decrementCartItem({productId, variantId})
        await handleGetCart()
    }

    async function handleRemoveCartItem({productId,variantId}){
        await removeCartItem({productId, variantId})
        await handleGetCart()
    }

    async function handleCreateCartOrder(){
        const data = await createCartOrder()
        return data.order
    }

    async function handleVerifyCartOrder({razorpay_order_id, razorpay_payment_id, razorpay_signature}){
        const data = await verifyCartOrder({razorpay_order_id, razorpay_payment_id, razorpay_signature})
        return data.success
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem, handleCreateCartOrder, handleVerifyCartOrder }
}