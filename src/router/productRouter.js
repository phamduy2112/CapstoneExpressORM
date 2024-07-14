import express from 'express'
import { addComment,addImageSave, addImage, checkSavedImage, commentDetail, deleteImage, getListImageByUser, getListSaveImageByUser, getProducts, productDetail, searchProducts } from '../controller/productController.js';
import { middleToken } from '../config/jwt.js';

const productRouter=express.Router();

productRouter.get("/get-products",middleToken,getProducts)
productRouter.get("/search-products",middleToken,searchProducts);
productRouter.get("/product-detail-image/:id",middleToken,productDetail)
productRouter.get("/comment-detail-image/:id",middleToken,commentDetail)
productRouter.get("/check-image/:idImage",middleToken,checkSavedImage);




productRouter.get('/get-image-by-user/:idUser',middleToken,getListImageByUser)
productRouter.get('/get-save-image-by-user/:idUser',middleToken,getListSaveImageByUser)
// post 
productRouter.post("/add-comment",middleToken,addComment);
productRouter.post('/add-image',middleToken,addImage);
productRouter.post('/add-image-save',middleToken,addImageSave);
// detele
productRouter.delete("/delete-image/:idImage",middleToken,deleteImage)
export default productRouter