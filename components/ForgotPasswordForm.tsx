import React from "react";

const ForgotPasswordForm = () => {
  return (
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col p-5 justify-evenly items-center"
    >
      <div className="w-3/4 h-10 flex items-center justify-center border-green-400 border-2 rounded-md bg-green-200">
        This is a sample
      </div>
      <p className="font-semibold w-3/4">
        Enter your email address, if we find it in our system you will be sent a
        link to your email.
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
  );
};

export default ForgotPasswordForm;
