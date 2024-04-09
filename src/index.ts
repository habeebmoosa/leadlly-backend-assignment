import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import  dbConnect  from './db/dbConnect';
import { userRouter } from './routes/users';
import { productRouter } from './routes/products';

dotenv.config();
const app = express();
const PORT = 3020;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use("/user", userRouter);
app.use("/product", productRouter);

dbConnect();

app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))