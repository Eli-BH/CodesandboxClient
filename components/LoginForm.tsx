import React, { useState } from "react";
import axios from "axios";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, NextRouter } from "next/router";

interface ILogin {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const router: NextRouter = useRouter();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );

      router.push("/");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };
  const alertType = (type: string): string | undefined => {
    switch (type) {
      case "error":
        return "red";
      case "info":
        return "yellow";
      case "success":
        return "green";
      default:
        return;
    }
  };
  return (
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col  p-5 justify-evenly items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`w-3/4 h-10 flex items-center justify-center  ${
          error ? "block" : "hidden"
        } border-${alertType("error")}-400 border-2 rounded-md bg-${alertType(
          "error"
        )}-200`}
      >
        {error}
      </div>
      <label className="w-3/4 md:w-3/4 lg:w-3/4   flex flex-col">
        Email:{" "}
        <input
          className="w-full"
          type="email"
          autoComplete="off"
          placeholder="Email"
          {...register("email")}
        />
      </label>

      <label className="w-3/4 md:w-3/4 lg:w-3/4  flex flex-col">
        Password:
        <input
          className="w-full"
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...register("password")}
        />
      </label>

      <div className="flex w-full justify-evenly ">
        <p className="text-blue-800 cursor-pointer">Forgot password</p>
        <p className="text-blue-800 cursor-pointer">Register </p>
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

export default LoginForm;
