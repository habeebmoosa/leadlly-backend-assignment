import { verifyAuth } from '../middlewares/verifyAuth';
import { edit, editPassword, login, logout, register } from '../controllers/users';
import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update', verifyAuth, edit);
router.put('/updatePassword', verifyAuth, editPassword);

export {router as userRouter}