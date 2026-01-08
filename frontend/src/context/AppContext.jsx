import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AppContext=createContext();

const AppContextProvider=(props)=>{

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const adminUrl = import.meta.env.VITE_ADMIN_URL;
   axios.defaults.withCredentials=true;

  const [doctors,setDoctors]=useState([])
 
  //page reload korar pore logout hoye jacce tai useState er modde ('') atar jaygay (localStorage.getItem('token')?localStorage.getItem('token'):false) deoya hole are auto logout hobe nah
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

  const [userData,setUserData]=useState({})


  //admin data
  const getDoctorsData=async()=>{
    try {
      const {data}=await axios.get(`${backendUrl}/api/doctor/list`)
      if(data.success){
        const availableDoctor =data.doctors.filter((doctor)=>(doctor.available))
        setDoctors(availableDoctor)

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  //user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/userData`);
      console.log("User Data Response:", data);

      if (data.success) {
        // API response যদি single user দেয়
        if (data.user) {
          setUserData(data.user);
        }
        // API response যদি multiple users array দেয়
        else if (data.users) {
          setUserData(data.users);
        }
      } else {
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const value={
    doctors,getDoctorsData,
    token,setToken,
    backendUrl,
    adminUrl,
    userData,getUserData
  }

  useEffect(()=>{
    getDoctorsData(); 
    getUserData();
  },[])



  return(
    <AppContext.Provider value={value}>
      {
        props.children
      }
    </AppContext.Provider>
  )
}

export {AppContext,AppContextProvider}