import mongoose from 'mongoose';
import productModel from '../models/product.model.js';
import { uploadFile } from '../services/storage.service.js';


export const createProduct = async (req, res) => {

    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }));

    const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id,
    })

    res.status(201).json({ message: "Product created successfully", success: true, product });
}

export const getSellerProducts = async (req, res) => {

    const seller = req.user;

    const products = await productModel.find({ seller: seller._id });

    res.status(200).json({ message: "Products fetched successfully", success: true, products });
    
}

export const getAllProducts = async (req,res) => {

    try {
        const { q } = req.query;
        let query = {};
        
        if (q) {
            query = {
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { description: { $regex: q, $options: 'i' } }
                ]
            };
        }

        const products = await productModel.find(query);

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", success: false, error: error.message });
    }
}

export const getProuctDetails = async (req,res) => {

    const { id } = req.params;

    const product = await productModel.findById(id)

    if(!product){
        return res.status(404).json({
            message: "product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "product details fetched successfully",
        success: true,
        product
    })
}

export const addProductVariant = async (req,res) => {

    const productId = req.params.productId;

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    })

    if(!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }
    
    const files = req.files;
    const images = [];
    
    if( files || files.length !== 0){
        (await Promise.all(files.map(async (file) => {
           const image = await uploadFile({
              buffer: file.buffer,
              fileName: file.originalname
            })
            return image
        }))).map(image => images.push(image))
    }

    const price = req.body.priceAmount;
    const stock = req.body.stock;
    const attributes = JSON.parse(req.body.attributes || "{}")

    product.variants.push({
        images,
        price: {
            amount: Number(price) || product.price.amount,
            currency: req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save()

    res.status(200).json({
        message: "New variant added successfully",
        success: true,
        product
    })
}

export const getSimilarProducts = async (req,res) => {
    try {
        const { id } = req.params;
        
        const currentProduct = await productModel.findById(id);
        if (!currentProduct) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        // Combine title and description to extract keywords
        const textToAnalyze = `${currentProduct.title} ${currentProduct.description || ''}`;
        
        // Extract words longer than 2 characters (e.g., 'Shirt', 'Polo', 'Jeans')
        const words = textToAnalyze.split(/[\s,\.\-]+/).filter(word => word.length > 2);
        
        // Remove duplicates
        const uniqueWords = [...new Set(words)];
        
        let matchCondition = { _id: { $ne: new mongoose.Types.ObjectId(id) } };

        if (uniqueWords.length > 0) {
            // Escape special regex characters
            const safeWords = uniqueWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            const regex = new RegExp(safeWords.join('|'), 'i');
            
            // Search in both title and description
            matchCondition.$or = [
                { title: { $regex: regex } },
                { description: { $regex: regex } }
            ];
        }

        const products = await productModel.aggregate([
            { $match: matchCondition },
            { $sample: { size: 30 } }
        ]);

        return res.status(200).json({
            message: "Similar products fetched successfully",
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching similar products", success: false, error: error.message });
    }
}