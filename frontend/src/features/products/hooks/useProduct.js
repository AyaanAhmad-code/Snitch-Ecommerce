import { addProductVariant, createProduct, getAllProducts, getProductById, getSellerProduct, getSimilarProducts} from "../service/product.api.js"
import { useDispatch } from "react-redux"
import { setProducts, setSellerProducts } from "../state/product.slice.js"

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData){
        const data = await createProduct(formData)
        return data.product
    }

    async function handleGetSellerProduct(){
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.product
    }

    async function handleGetAllProducts(query = ""){
        const data = await getAllProducts(query)
        dispatch(setProducts(data.products))
    }

    async function handleGetProductById(productId){
        const data = await getProductById(productId)
        return data.product
    }

    async function handleAddProductVariant(productId, newProductVariant){
        const data = await addProductVariant(productId, newProductVariant)
        return data
    }

    async function handleGetSimilarProducts(productId){
        const data = await getSimilarProducts(productId)
        return data.products
    }

    return {
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProducts,
        handleGetProductById,
        handleAddProductVariant,
        handleGetSimilarProducts
    }
}