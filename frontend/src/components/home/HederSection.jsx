
import { assets } from '../../assets/assets'

const HederSection = () => {
  return (
    <div>
      <div className="grid gird-col gap-15 md:gap-0 md:grid-cols-2  bg-[#14B8A6] rounded-sm mt-10 pt-20">
        <div className="flex flex-col gap-10 items-center md:items-start justify-center mx-5 md:ml-10 md:mt-20">
          <p className="text-5xl text-center md:text-start md:text-5xl leading-15 font-bold text-white">
            Book Trusted Doctors Anytime, Anywhere
          </p>
          <div className="flex  gap-6 items-center">
            <img src={assets.group_profiles} alt="" />
            <p className="text-sm text-gray-200 outfit text-start">
              Easily explore our network of trusted doctors and book your
              appointment without any hassle.
            </p>
          </div>
          <button
            onClick={() => scrollTo({ top: 530, behavior: "smooth" })}
            className="cursor-pointer flex justify-center items-center gap-2 outfit text-md bg-white font-semibold  rounded-full px-5 py-2.5 text-gray-500"
          >
            Book Now <img src={assets.arrow_icon} alt="" />
          </button>
        </div>

        <div className="mx-5 flex items-end justify-center md:mt-20">
          <img src={assets.header_img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HederSection