import jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    email?: string;
    userId?: string;
}

export const verifyAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).json({ message: "Please authenticate with valid credential" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        if (typeof data !== 'string') {
            req.email = data.email;
            req.userId = data.id;

            next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        return res.status(401).json({ message: "Please authenticate with valid credential" });
    }
}