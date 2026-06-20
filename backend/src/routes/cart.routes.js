import { Router } from "express"
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart, validateDecrementCartItemQuantity, validateIncrementCartItemQuantity, validateRemoveCartItem } from "../validators/cart.validator.js";
import { addToCart, createOrderController, decrementCartItemQuantity, getCart, incrementCartItemQuantity, removeCartItem, verifyPaymentController } from "../controllers/cart.controller.js";

const router = Router();

router.post("/add/:productId/:variantId",authenticateUser, validateAddToCart, addToCart);

router.get('/' , authenticateUser, getCart)

router.patch('/quantity/increment/:productId/:variantId',authenticateUser,validateIncrementCartItemQuantity,incrementCartItemQuantity)

router.patch('/quantity/decrement/:productId/:variantId',authenticateUser,validateDecrementCartItemQuantity,decrementCartItemQuantity)

router.delete('/remove/:productId/:variantId', authenticateUser, validateRemoveCartItem, removeCartItem)

router.post("/payment/create/order", authenticateUser, createOrderController)

router.post("/payment/verify/order", authenticateUser, verifyPaymentController)

export default router;