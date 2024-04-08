import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../db/models/users';

interface UserRegistration {
    name: String,
    email: String,
    password: String
}

export const register = async (req: Request<UserRegistration>, res: Response) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ "error": "Values must be thier" })
        }

        const isUserExist = await UserModel.findOne({ email: email })

        if (isUserExist) {
            return res.status(400).json({ "message": "User is already exits. Try to Login" })
        }

        const salt = 12;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ name: name, email: email, password: hashedPassword });
        const saveUser = await newUser.save();

        res.status(201).json(saveUser)
    } catch (error) {
        res.status(404).json({ "error": error })
    }
}

export const login = async (req: Request, res: Response) => {
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