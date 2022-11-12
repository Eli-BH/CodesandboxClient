import React from "react";
import Image from "next/image";
import logo from "../../utils/Logo-Orange.svg";

const reset_password = () => {
  return (
    <div className="relative w-[100vw] h-[100vh] flex">
      <div className="w-full lg:w-[50%] h-[100%] bg-[url('../utils/background.png')] flex justify-center items-center ">
        <div className="w-[450px] md:h-[550px] lg:h-[550px] xl:h-[550px] h-full bg-white  lg:rounded-md shadow-lg opacity-100 shadow-black ">
          <div className="h-[20%]  flex justify-center items-center">
            <Image
              src={logo}
              alt="Freedom care logo"
              className="w-[300px] h-auto"
            />
          </div>

          <form
            autoComplete="off"
            className="h-[80%] flex flex-col p-5 justify-evenly items-center"
          >
            <div className="w-3/4 h-10 flex items-center justify-center border-green-400 border-2 rounded-md bg-green-200">
              This is a sample
            </div>
            <p className="font-semibold w-3/4">
              Enter your email address, if we find it in our system you will be
              sent a link to your email.
            </p>
            <input
              className="w-3/4"
              type="email"
              autoComplete="off"
              placeholder="Email"
            />

            <button
              className="
      bg-[#12385a] 
      rounded-sm 
      font-semibold 
      text-white 
      border-2 
      border-orange-500 
      px-3 
      py-2 
      text-xl 
      w-[10em] 
      cursor-pointer 
      hover:scale-95 
      transition-all 
      outline-none 
      focus:border-green-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="lg:block hidden lg:w-[50%] h-full bg-[url('../utils/caregiver.jpg')] bg-cover bg-no-repeact bg-right"></div>
    </div>
  );
};

export default reset_password;
