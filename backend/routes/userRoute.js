import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, getUserData, listAppointment, updateProfile, updateUserData } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authUser } from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter=express.Router();

userRouter.get('/userData',authMiddleware,getUserData)
userRouter.put('/updateData',authMiddleware,updateUserData)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)





export default userRouter