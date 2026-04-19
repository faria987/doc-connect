import { useEffect } from "react"
import { assets } from "../assets/assets"

const Contact = () => {
  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  },[])
  return (
    <div>
      <div className="flex flex-col gap-10 items-center my-15 poppins mx-5 ">
        <p className="text-xl font-semibold tracking-wide text-gray-500">
          CONTACT <span className="text-black">US</span>
        </p>

        <div className="flex flex-col md:flex-row  items-start md:items-end gap-10">
          <div>
            <div>
              <img className="md:h-120" src={assets.contact_image} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-7 text-gray-500 text-sm ">
            <p className="text-gray-700 text-lg font-semibold">OUR OFFICE</p>
            <p>
              3200 Sylhet, Bangladesh
              <br />
              3200 Cumilla, BD <br />
              3200 Dhaka, BD <br />
              3200 Dhaka, BD
            </p>
            <p>
              Tel: (+8801) 000-000-000
              <br />
              Email: docconnect@gmail.com
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              CAREERS AT DOC-CONNECT
            </p>
            <p>Learn more about our teams and job openings.</p>
            {/* <button className="border border-gray-500 text-lg font-semibold text-black outfit px-8 py-3 hover:bg-black hover:text-white duration-300 ease-in">
              Explore Jobs
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact