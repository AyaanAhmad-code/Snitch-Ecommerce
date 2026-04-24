import { Router } from 'express';
import { authenticateSeller } from '../middleware/auth.middleware.js';
import { createProduct, getAllProducts, getSellerProducts, getProuctDetails, addProductVariant, getSimilarProducts } from '../controllers/product.controller.js';
import multer from 'multer';
import { createProductValidator } from '../validators/product.validator.js';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const productRouter = Router();

productRouter.post('/', authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)

productRouter.get('/seller', authenticateSeller, getSellerProducts) 

productRouter.get('/', getAllProducts)

productRouter.get("/detail/:id", getProuctDetails)

productRouter.post("/:productId/variants",authenticateSeller, upload.array('images', 7), addProductVariant)

productRouter.get("/similar/:id", getSimilarProducts)

export default productRouter;