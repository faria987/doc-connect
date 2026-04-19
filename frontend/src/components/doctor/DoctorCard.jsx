import { useNavigate } from "react-router-dom"


const DoctorCard = ({doctorsFilterData=[]}) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="grid grid-col md:grid-cols-3 gap-5">
        {doctorsFilterData.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 px-6 bg-white">
            {/* Icon */}
            <div className="bg-[#EAEFFF] p-5 rounded-full mb-5">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zM8.25 15a3.75 3.75 0 007.5 0"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">
              No Doctors Found
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
              We couldn’t find any doctors matching your search or filter
              criteria. Try adjusting your filters or search again.
            </p>
          </div>
        ) : (
          doctorsFilterData?.map(
            (doctor, index) =>
              doctor.available && (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/appointment/${doctor._id}`);
                    scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="border rounded-sm border-[#C9D8FD] hover:-translate-y-3 duration-300 cursor-pointer"
                >
                    <img
                      className="bg-[#EAEFFF] rounded-t-sm w-full h-48 object-cover "
                      src={doctor.image}
                      alt=""
                    />
                  <div className="flex items-center gap-2 ml-5 mt-4 text-green-500 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Available
                  </div>

                  <p className="pl-5 text-md font-semibold pt-2">
                    {doctor.name}
                  </p>
                  <p className="pl-5 text-sm text-gray-500 pb-4">
                    {doctor.speciality}
                  </p>
                </div>
              ),
          )
        )}
      </div>
    </div>
  );
}

export default DoctorCard