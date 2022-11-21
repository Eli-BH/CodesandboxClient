import React from "react";

const PatientRegisterForm = () => {
  return (
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col p-5 justify-evenly items-center"
    >
      <div
        className={`w-3/4 h-10 flex items-center justify-center border-red-400 border-2 rounded-md bg-red-200`}
      >
        This is a sample
      </div>
      <input
        className="w-3/4"
        type="email"
        autoComplete="off"
        placeholder="Email"
      />
      <input
        className="w-3/4"
        type="password"
        placeholder="Password"
        autoComplete="off"
      />
      <input
        className="w-3/4"
        type="Medicaid ID"
        autoComplete="off"
        placeholder="text"
      />
      <div className="flex w-full justify-evenly ">
        <p className="text-blue-800 cursor-pointer">Forgot password</p>
        <p className="text-blue-800 cursor-pointer">Register for FreedomCare</p>
      </div>
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

export default PatientRegisterForm;
