import { CreateProductRequestBody, GetCurrentUser } from '../utils/definations';
import { ProductModel } from '../db/models/products';
import { Request, Response } from 'express';

export const createProduct = async (req: GetCurrentUser, res: Response) => {
    const {
        title,
        description,
        brand, 
        category,
        price,
        discountPercentage,
        rating,
        stock
    } = req.body as CreateProductRequestBody;

    const userId = (req as any).userId;
    const userRole = (req as any).role;

    try {
        if(userRole !== 'admin') {
            return res.status(401).json({ "message": "You are not authorized to create product. You are not admin" });
        }

        if(!title || !description || !brand || !category || !price || !discountPercentage || !rating || !stock) {
            return res.status(400).json({ "error": "Values must be thier" })
        }

        const images: string[] = (req.files as Express.Multer.File[]).map(file => file.path);

        const product = new ProductModel({
            productInfo: {
                title: title,
                description: description,
                brand: brand,
                category: category,
                images: images
            },
            price: {
                MRP: price,
                discountPercentage: discountPercentage
            },
            rating: rating,
            stock: stock,
            user: userId
        });

        const saveProduct = await product.save();

        res.status(201).json(saveProduct);
    } catch (error) {
        res.status(404).json({ "error": error })
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();

        if(products.length === 0) {
            return res.status(404).json({ "message": "No products found" });
        }

        const productsData = products.map(product => {
            return {
                title: product.productInfo.title,
                description: product.productInfo.description,
                brand: product.productInfo.brand,
                category: product.productInfo.category,
                images: product.productInfo.images,
                price: product.price.MRP,
                discountPercentage: product.price.discountPercentage,
                rating: product.rating,
                stock: product.stock
            }
        });

        res.status(200).json(productsData);
    } catch (error) {
        res.status(404).json({ "error": error })
    }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;

    try {
        const products = await ProductModel.find({ "productInfo.category": category });

        if(products.length === 0) {
            return res.status(404).json({ "message": "No products found" });
        }

        const productsData = products.map(product => {
            return {
                title: product.productInfo.title,
                description: product.productInfo.description,
                brand: product.productInfo.brand,
                category: product.productInfo.category,
                images: product.productInfo.images,
                price: product.price.MRP,
                discountPercentage: product.price.discountPercentage,
                rating: product.rating,
                stock: product.stock
            }
        });

        res.status(200).json(productsData);
    } catch (error) {
        res.status(404).json({ "error": error })
    }
}

export const getProductsByUser = async (req: GetCurrentUser, res: Response) => {
    const userId = (req as any).userId;
    const userRole = (req as any).role;
    console.log(userId);

    try {
        if(userRole !== 'admin') {
            return res.status(401).json({ "message": "You are not authorized to view products. You are not admin, only admins can view thier created products." });
        }

        const products = await ProductModel.find({ user: userId });

        if(products.length === 0) {
            return res.status(404).json({ "message": "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ "error": error })
    }
}