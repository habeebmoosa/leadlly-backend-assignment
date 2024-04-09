import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productInfo: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        images: {
            type: [String],
            required: true,
            validate: {
                validator: (images: string[]) => images.length > 0,
                message: "At least one image is required"
            }
        }
    },
    price: {
        MRP: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number,
            required: true
        },
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

export const ProductModel = mongoose.model("products", ProductSchema);