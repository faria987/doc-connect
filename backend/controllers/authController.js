import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
const frontendUrl = process.env.VITE_FRONTEND_URL;

//register
export const register = async(req,res)=>{
 
  const {name,email,password}=req.body;

  if(!name||!email||!password){
    return res.json({success:false,message:'Missing Details'})
  }

  try {

    //validating email
    if(!validator.isEmail(email)){
      return res.json({success:false,message:'Enter a valid Email'})
    }

    //validating password
    if(password.length<8){
      return res.json({success:false,message:"Enter a Strong password"})
    }

    //hashed password 
    const hashedPassword = await bcrypt.hash(password,10);
    
    //save to db
    const user = new userModel(
      {
        name,
        email,
        password:hashedPassword
      }
    )
    await user.save();

const mailOption = {
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: 'Welcome to DocConnect!',
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #ddd;">
      
      <!-- Header -->
      <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; font-size: 26px; font-weight: bold;">
        Welcome to DocConnect
      </div>
      
      <!-- Body -->
      <div style="padding: 25px; color: #333; line-height: 1.8;">
        
        <p>Hello <strong>${name}</strong>,</p>

        <p>
          🎉 Your account has been successfully created using:
        </p>

        <!-- Highlight Box (OTP style feel) -->
        <div style="margin: 20px 0; font-size: 16px; color: #4CAF50; background: #e8f5e9; border: 1px dashed #4CAF50; padding: 12px; text-align: center; border-radius: 5px; font-weight: bold;">
          ${email}
        </div>

        <p>
          You can now book appointments with trusted doctors and manage your health records easily.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 25px 0;">
          <a href="${frontendUrl}/api/auth/login" target="_blank"
            style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Login to Your Account
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">
          If you did not create this account, no further action is required.
        </p>

      </div>

      <!-- Footer -->
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #777; font-size: 12px; border-top: 1px solid #ddd;">
        &copy; ${new Date().getFullYear()} DocConnect. All rights reserved.
      </div>

    </div>
    
  </div>
  `
};

    await transporter.sendMail(mailOption);

    //token return
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res
    .cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite: process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
    .json({
      success:true,
      message:'Success fully SignUp',
      token
    })

    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message}) 
  }
}

//login
export const login = async(req,res)=>{
  const {email,password}=req.body;

  if(!email||!password){
    return res.json({success:false,message:'Missing Details '})
  }

  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"Invalid Email"})
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({success:false,message:'Incorrect password'})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res
    .cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite: process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
    .json({
    success: true,
    message:'Success fully Logged in',
    token
    });

  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}

//logout
export const logout = async(req,res)=>{
  try {

    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite: process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
    return res.json({success:true,message:'Success fully logged out'})
    
  } catch (error) {
    console.log(error)
    return res.json({success:false})
    
  }
}

// send verify otp
export const sendVerifyOtp = async(req,res)=>{
  try {
    const {token}=req.cookies;
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
    req.userId=tokenDecode.id
    const userId = req.userId;
    const user = await userModel.findById(userId)

    if(!user){
      return res.json({success:false,message:'User Not Found'})
    }

    if(user.isAccountVerified){
      return res.json({success:false,message:'Account already verified'})
    }

    const otp = String(Math.floor(100000+Math.random()*900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt=Date.now()+10*60*1000;
    await user.save();


  const mailOption = {
  from: process.env.SENDER_EMAIL,
  to: user.email,
  subject: 'Account Verification OTP',
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <h2 style="text-align:center; color:#4CAF50;">Verify Your Account</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Thank you for registering with <strong>DocConnect</strong>! Use the OTP below to verify your account:</p>
        
        <div style="text-align:center; margin: 30px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #4CAF50; letter-spacing: 2px; border: 1px dashed #4CAF50; padding: 10px 20px; border-radius:5px;">
            ${otp}
          </span>
        </div>

        <p>If you did not create an account, ignore this email.</p>

        <div style="text-align:center; margin-top: 20px;">
          <a href="${frontendUrl}/api/auth/verify-account" target="_blank" 
             style="background-color:#4CAF50; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">
            Verify Account
          </a>
        </div>

        <p style="text-align:center; color:#999; margin-top:30px;">&copy; ${new Date().getFullYear()} DocConnect. All rights reserved.</p>
      </div>
    </div>
  `
};

    await transporter.sendMail(mailOption)

    return res.json({success:true,message:'verification otp sent on email.chick your email address'})

  } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message}) 
  }
}

//verify-account
export const verifyAccount = async(req,res)=>{
    const {otp}=req.body
    const userId=req.userId

    if(!otp||!userId){
      return res.json({success:false,message:'Missing details'})
    }
  try {
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success:false,message:'user not founded'})
    }

    if(user.verifyOtp===''||user.verifyOtp!==otp){
      return res.json({success:false,message:'Invalid otp'})
    }

    if(user.verifyOtpExpireAt<Date.now()){
      return res.json({success:false,message:'otp Expired'})
    }

    user.isAccountVerified=true;
    user.verifyOtp='';
    user.verifyOtpExpireAt=0;

    await user.save();

    return res.json({success:true,message:'email verified successfully'})

  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}

//check if user is authenticated
export const isAuth = async(req,res)=>{
  
  try {
    return res.json({success:true,message:'Your account is authenticated'})
    
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}

//send reset otp
export const sendResetOtp = async(req,res)=>{
  const {email}=req.body;
  if(!email){
    return res.json({success:false,message:'Email is required'})
  }
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:'user not founded'})
    }

    const otp = String(Math.floor(100000+Math.random()*900000));
    user.resetOtp=otp;
    user.resetOtpExpireAt = Date.now()+10*60*1000
    await user.save();

const mailOption = {
  from: process.env.SENDER_EMAIL,
  to: user.email,
  subject: 'Password Reset OTP',
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #ddd;">
      
      <!-- Header -->
      <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; font-size: 26px; font-weight: bold;">
        Reset Your Password
      </div>
      
      <!-- Body -->
      <div style="padding: 25px; color: #333; line-height: 1.8;">
        
        <p>Hello <strong>${user.name}</strong>,</p>

        <p>
          We received a request to reset your password. Use the OTP below to continue:
        </p>

        <!-- OTP Box -->
        <div style="margin: 20px 0; font-size: 22px; color: #4CAF50; background: #e8f5e9; border: 1px dashed #4CAF50; padding: 12px; text-align: center; border-radius: 5px; font-weight: bold; letter-spacing: 2px;">
          ${otp}
        </div>

        <p>
          This OTP is valid for a limited time. Please do not share it with anyone.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 25px 0;">
          <a href="${frontendUrl}/api/auth/reset-password" target="_blank"
            style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">
          If you did not request a password reset, please ignore this email.
        </p>

      </div>

      <!-- Footer -->
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #777; font-size: 12px; border-top: 1px solid #ddd;">
        &copy; ${new Date().getFullYear()} DocConnect. All rights reserved.
      </div>

    </div>
    
  </div>
  `
};

    await transporter.sendMail(mailOption)
    return res.json({success:true,message:'otp sent to your email'});
    
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}


//reset password
export const resetPassword = async(req,res)=>{
  const {email,otp,newPassword}=req.body;

  if(!email||!otp||!newPassword){
    return res.json({success:false,message:"Missing details"})
  }

  try {
    const user=await userModel.findOne({email});

    if(!user){
      return res.json({success:false,message:'User not found'});
    }


    if(user.resetOtp===''||String(user.resetOtp)!==String(otp)){
      return res.json({success:false,message:'invalid otp'})
    }

     if(user.resetOtpExpireAt<Date.now()){
      return res.json({success:false,message:"otp expired"})
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp='';
    user.resetOtpExpireAt=0;
    await user.save();

    return res.json({success:true,message:'password has been reset successfully'})
    
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}