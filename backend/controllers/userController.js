import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";

export const getUserData=async(req,res)=>{
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select(['-password']);

    if(!user){
      return res.json({success:false,message:"User not found"})
    }

    res.json({
      success:true,
      message:{
        name:user.name,
        isAccountVerified:user.isAccountVerified
      }
      ,
      user
    });
    
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}

// Update user data
export const updateUserData = async (req, res) => {
  try {
    const updatedData = req.userId;
    const user = await userModel.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, user, message: "User updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get user profile data

export const getProfile=async(req,res)=>{
  try {
    const userId=req.userId

    const userData = await userModel.findById(userId).select('-password')
    res.json({success:true,userData})
    
  } catch (error) {
    
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

// api to update user profile
export const updateProfile = async (req,res)=>{
  try {
    const userId = req.userId
    const {name,phone,address,dob,gender}=req.body
    const imageFile=req.file
    if(!name || !phone || !dob || !gender){
      return res.json({success:false,message:"Data Missing"})

    }
    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
    if(imageFile){
      // update image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }

    res.json({success:true,message:"profile updated"

    })
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

// api to book appointment

export const bookAppointment = async(req,res)=>{
  try {
  // const userId = req.userId
    const {userId,docId,slotDate,slotTime}=req.body
    const docData = await doctorModel.findById(docId).select('-password')

    if(!docData.available){
      return res.json({success:false,message:'Doctor not available'})
    }

    let slots_booked = docData.slots_booked

    // checking for slot availablity

    if(slots_booked[slotDate]){

      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,message:'Slot not available '})
      }else{
        slots_booked[slotDate].push(slotTime)
      }

    }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')
    delete docData.slots_booked

    const appointmentData={
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:'Appointment Booked'})

    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

// api to get user appointments for frontend my-appointment page

export const listAppointment = async(req,res)=>{
  try {
    const {userId} = req.userId
    const appointments = await appointmentModel.find({userId})
    res.json({success:true,appointments})
    
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}


// api to cancel appointment

export const cancelAppointment = async (req,res)=>{
  try {
    // const userId = req.userId

    const {userId,appointmentId}=req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    // verify appointment user
    if(appointmentData.userId !== userId){
      return res.json({success:false,message:'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    // releasing doctor slot
    const {docId,slotDate,slotTime}=appointmentData
    const doctorData= await doctorModel.findById(docId)
    let slots_booked=doctorData.slots_booked
    
    if(slots_booked[slotDate]){
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e)=> e !== slotTime
      )
    }


    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:'Appointment Canceled'})
    
  } catch (error)
   {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}
