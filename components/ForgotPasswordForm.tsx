import React from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

interface IForm {
  email: string;
}

const ForgotPasswordForm = (): JSX.Element => {
  const [success, setSuccess] = useState(false);
  const [axiosError, setAxiosError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    try {
      await axios.post(
        `https://localhost:${process.env.PORT}/api/forgot_password`,
        {
          email: data.email,
        }
      );

      setSuccess(true);
    } catch (error: any) {
      console.error(error);
      setAxiosError(error.response.data.message);
    }
  };

  return (
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col p-5 justify-evenly items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors?.email?.message && (
        <div className="w-3/4 h-10 flex items-center justify-center border-red-400 border-2 rounded-md bg-red-200">
          {errors?.email?.message}
        </div>
      )}
      {axiosError && (
        <div className="w-3/4 h-10 flex items-center justify-center border-red-400 border-2 rounded-md bg-red-200">
          {axiosError}
        </div>
      )}

      <p className="font-semibold w-3/4">
        Enter your email address, you will be sent a link to your email.
      </p>

      {success ? (
        <div
          className="w-3/4 h-10 flex items-center justify-center border-green-400 border-2 rounded-md bg-green-200 font-semibold cursor-pointer "
          onClick={() => router.push("/auth/signin")}
        >
          Thanks! Click here to go back to login
        </div>
      ) : (
        <label className="w-3/4 md:w-3/4 lg:w-3/4   flex flex-col">
          Email:
          <input
            className="w-full"
            type="email"
            autoComplete="off"
            placeholder="Email"
            {...register("email", { required: "Email Address is required" })}
          />
        </label>
      )}

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

export default ForgotPasswordForm;
