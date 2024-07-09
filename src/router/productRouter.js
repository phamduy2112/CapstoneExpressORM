import express from 'express'
import { addComment, checkSavedImage, commentDetail, getProducts, productDetail, searchProducts } from '../controller/productController.js';

const productRouter=express.Router();

productRouter.get("/get-products",getProducts)
productRouter.get("/search-products",searchProducts);
productRouter.get("/product-detail-image/:id",productDetail)
productRouter.get("/comment-detail-image/:id",commentDetail)
productRouter.get("/check-image/:idImage",checkSavedImage);
// post 
productRouter.post("/add-comment",addComment);

export default productRouter