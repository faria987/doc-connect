import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const MyProfile = () => {
  const [profileImg,setProfileImg]=useState(false)
  const { userData, setUserData, backendUrl, token } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  if (!userData) return null;

  const handleEdit=()=>{
    setIsEdit(!isEdit);
  }

  

  
  return (
    <div className="py-10  flex justify-center">
      <form className="w-2/3 rounded drop-shadow-gray-400 shadow-md">
        <div className="">
          <div className=" flex justify-center">
            <div className=" w-full h-60 rounded-t overflow-hidden flex items-center justify-center">
              {/* profile image circle */}
              <div className=" w-30 h-30 rounded-full  bg-gray-300 overflow-hidden">
                <label
                  htmlFor="profileImg"
                  className="cursor-pointer w-full h-full block"
                >
                  <img
                    src={
                      profileImg
                        ? URL.createObjectURL(profileImg)
                        : assets.upload_icon
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </label>

                <input
                  type="file"
                  id="profileImg"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setProfileImg(e.target.files[0])}
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-10 p-10">
            <p className="text-center font-bold poppins text-2xl">forhad</p>

            <div className="flex flex-col gap-10">
              <div className="">
                <p className="poppins text-base font-bold inline-block border-b  border-gray-300">
                  Contact Information
                </p>
                <div className="pt-5 flex items-center gap-5">
                  <label className="text-base outfit" htmlFor="">
                    Email :
                  </label>
                  <input
                    className="border-b-1 border-gray-300  outline-none px-2 py-1.5  w-1/3"
                    type="email"
                  />
                </div>

                <div className="pt-5">
                  <div className="flex items-center gap-5">
                    <label className="text-base outfit" htmlFor="">
                      Phone :
                    </label>
                    <input
                      className="border-b border-gray-300  outline-none px-2 py-1.5"
                      type="number"
                    />
                  </div>

                  <div className="flex flex-col pt-5">
                    <label className="text-base outfit" htmlFor="">
                      Address :
                    </label>
                    <div className="flex flex-col gap-5">
                      <input
                        placeholder="Line 1"
                        className="border-b border-gray-300 outline-none px-2 py-1.5 w-1/3"
                        type="text"
                      />
                      <input
                        placeholder="Line 2"
                        className="border-b border-gray-300 outline-none px-2 py-1.5 w-1/3"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <p className="border-b font-bold border-gray-300 inline-block">
                  Basic Information
                </p>
                <div className="pt-5 flex items-center gap-2">
                  <label htmlFor="">Gander :</label>
                  <input
                    className="border-b border-gray-300 py-1.5 px-2 outline-none"
                    type="text"
                  />
                </div>

                <div className="pt-5 flex items-center gap-2">
                  <label htmlFor="">BirthDay :</label>
                  <input
                    type="date"
                    className="border-b text-gray-400 border-gray-300 py-1.5 px-2 outline-none"
                  />
                </div>

                <div className="flex justify-center my-10">
                  {isEdit ? (
                    <button className="border rounded px-5 py-0.5 poppins font-bold text-base hover hover:bg-green-500 hover:text-white">
                      Save
                    </button>
                  ) : (
                    <button
                    type="button"
                      onClick={handleEdit}
                      className="border rounded px-5 py-0.5 poppins font-bold text-base hover hover:bg-red-500 hover:text-white"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
