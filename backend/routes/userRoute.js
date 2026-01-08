import express from 'express'
import { getUserData, updateUserData } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const userRouter=express.Router();

userRouter.get('/userData',authMiddleware,getUserData)
userRouter.put('/updateData',authMiddleware,updateUserData)





export default userRouter