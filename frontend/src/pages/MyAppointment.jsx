import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'



const MyAppointment = () => {
  const {backendUrl,token}=useContext(AppContext)
  const [appointment,setAppointment]=useState([])

  const months=[" ","Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+" " + months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments=async ()=>{
    try {
      
      const {data}= await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

      if(data.success){
        setAppointment(data.appointments.reverse())
        console.log(data.appointment);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

      
    }
  }

  const cancelAppointment = async(appointmentId)=>{
    try {

      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getUserAppointments()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }

  },[token])


  return (
    <div className="mx-5">
      <p className="border-b border-gray-300 text-xl font-semibold mt-15 pb-5">
        My appointment
      </p>
      <div className="my-5">
        {appointment.map((item, index) => (
          <div
            className="grid grid-cols-[40%50%] md:grid-cols-[15%60%20%] gap-5 border-b border-gray-300 my-5 pb-3 "
            key={index}
          >
            <div>
              <img className="bg-[#EAEFFF]" src={item.docData.image} alt="" />
            </div>
            <div className="flex flex-col justify-end outfit text-sm text-gray-500 gap-1 items-start">
              <p>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p>address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p>
                <span>
                  Date & Time:
                  <span>
                    {slotDateFormat(item.slotDate)}|{item.slotTime}
                  </span>
                </span>
              </p>
            </div>
            <div className="flex flex-col md:flex-col justify-end items-end gap-2">
              {/* <button className="w-full border px-5 py-1 text-md font-semibold border-green-500 text-green-500 cursor-pointer rounded">
                Pay Online
              </button> */}

              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="w-full border px-5 py-1 text-md font-semibold border-red-500 text-red-500 cursor-pointer rounded"
                >
                  Cancel appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment