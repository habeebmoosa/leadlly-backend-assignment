import { Request } from 'express';

export interface UserRegistration {
    name: string;
    email: string;
    password: string;
    phoneno: Number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: Number;
        country: string;
    };
    paymentInfo: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
    };
    role: string;
}

export interface UserLogin {
    email: String,
    password: String
}

export interface CreateProductRequestBody {
    title: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
}

export interface GetCurrentUser extends Request {
    userId: string;
    role: string;
}

export interface UserEdit {
    name: string;
    email: string;
    phoneno: Number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: Number;
        country: string;
    };
    paymentInfo: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
    };
    role: string;
}

export interface UserEditPassword {
    oldPassword: string;
    newPassword: string;
}