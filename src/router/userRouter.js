import express from 'express'

import { AddImageUser, editUser, getUserId, getUsers, login, register } from '../controller/userController.js';
import { middleToken } from '../config/jwt.js';
const userRouter=express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login);
userRouter.get("/get-users",middleToken,getUsers)
userRouter.get("/get-user-id/:idUser",middleToken,getUserId);
userRouter.post('/post-image-user/:idUser',middleToken,AddImageUser);
userRouter.put('/edit-user/:idUser',middleToken,editUser)
export default userRouter