import express from 'express';
import { verifyAuth } from '../middlewares/verifyAuth';
import { createProduct, getProducts, getProductsByCategory, getProductsByUser } from '../controllers/products';
import { upload } from '../middlewares/multurConfig';

const router = express.Router();

router.post('/create', verifyAuth, upload.array('images', 3), createProduct);
router.get('/get', getProducts);
router.get('/get/:category', getProductsByCategory);
router.get('/getById', verifyAuth, getProductsByUser);

export { router as productRouter }