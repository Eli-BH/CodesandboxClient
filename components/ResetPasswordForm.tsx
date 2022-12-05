import { useState } from "react";

const ResetPasswordForm = () => {
  const [passwordViz, setPasswordViz] = useState<boolean>(false);
  return (
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col p-5 justify-evenly items-center"
    >
      <div className="w-3/4 h-10 flex items-center justify-center border-green-400 border-2 rounded-md bg-green-200">
        This is a sample
      </div>
      <input
        className="w-3/4"
        type="password"
        autoComplete="off"
        placeholder="New Password"
      />
      <input
        className="w-3/4"
        type="password"
        placeholder="Confirm Password"
        autoComplete="off"
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
        Submit
      </button>
    </form>
  );
};

export default ResetPasswordForm;
