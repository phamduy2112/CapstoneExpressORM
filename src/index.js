
import express from 'express'
import userRouter from './router/userRouter.js';
const app=express();


app.use(express.static("."))

import cors from 'cors';
import productRouter from './router/productRouter.js';
app.use(cors({origin:"*"}))
app.use(express.json());
app.use('/user',userRouter);
app.use('/product',productRouter);

app.listen(8080);