import { verifyAuth } from '../middlewares/verifyAuth';
import { login, logout, register } from '../controllers/users';
import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export {router as userRouter}