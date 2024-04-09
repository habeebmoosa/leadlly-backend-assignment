import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../db/models/users';
import {UserRegistration, UserLogin, UserEdit, GetCurrentUser} from '../utils/definations';

export const register = async (req: Request<UserRegistration>, res: Response) => {
    const {
        name,
        email,
        password,
        phoneno,
        shippingAddress,
        paymentInfo,
        role
    } = req.body;

    try {
        if (!name || !email || !password || !phoneno) {
            return res.status(400).json({ "error": "Values must be thier" })
        }

        const isUserExist = await UserModel.findOne({ email: email })

        if (isUserExist) {
            return res.status(400).json({ "message": "User is already exits. Try to Login" })
        }

        const salt = 12;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            phoneno,
            shippingAddress,
            paymentInfo,
            role
        });
        const saveUser = await newUser.save();

        res.status(201).json(saveUser)
    } catch (error) {
        res.status(404).json({ "error": error })
    }
}

export const login = async (req: Request<UserLogin>, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ "error": "Values must be thier" })
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ "message": "User does not exist, Try to register first!" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ "message": "Password is not matched" });
        }

        const data = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.cookie('token', token, { domain: 'localhost', path: '/' });

        res.status(200).json({ message: "Sign in token", token });

    } catch (error) {
        res.status(404).json({ "error": error })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies['token'];

        if(!token){
            return res.status(400).json({"message":"you haven't logged in"})
        }

        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const edit = async (req: GetCurrentUser, res: Response) => {
    const userId = (req as any).userId;
    const {
        name,
        email,
        phoneno,
        shippingAddress,
        paymentInfo,
        role
    } = req.body as UserEdit;

    try {
        const user = await UserModel.findById({ _id: userId });
        if(!userId && !user) {
            return res.status(400).json({ "error": "User not found" })
        }

        const updatedUser = {
            name: name || user.name,
            email: email || user.email,
            phoneno: phoneno !== 0 ? phoneno : user.phoneno,
            shippingAddress: {
                street: shippingAddress.street || user.shippingAddress.street,
                city: shippingAddress.city || user.shippingAddress.city,
                state: shippingAddress.state || user.shippingAddress.state,
                zip: shippingAddress.zip === 0 ? user.shippingAddress.zip : shippingAddress.zip,
                country: shippingAddress.country || user.shippingAddress.country
            },
            paymentInfo: {
                cardNumber: paymentInfo.cardNumber || user.paymentInfo.cardNumber,
                cardHolder: paymentInfo.cardHolder || user.paymentInfo.cardHolder,
                expirationDate: paymentInfo.expirationDate || user.paymentInfo.expirationDate,
                cvv: paymentInfo.cvv || user.paymentInfo.cvv
            },
            role: role || user.role
        }

        await UserModel.findByIdAndUpdate({ _id: userId }, updatedUser, { new: true });

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ "error": error })
    }
}

export const editPassword = async (req: GetCurrentUser, res: Response)=> {
    const userId = (req as any).userId;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findById({ _id: userId})

        if(!user) {
            return res.status(400).json({ "error": "User not found" })
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ "message": "Your current Password is not matched" });
        }

        const salt = 12;
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await UserModel.findByIdAndUpdate({ _id: userId }, { password: hashedPassword }, { new: true });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(400).json({ "error": error })
    }
}