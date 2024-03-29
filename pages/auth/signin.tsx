import React from "react";
import Image from "next/image";
import logo from "../../utils/Logo-Orange.svg";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { NextPage } from "next";

interface ILogin {
  email: string;
  password: string;
}

const SignIn: NextPage = (props): JSX.Element => {
  const [error, setError] = useState<string | undefined>("");
  const [visibility, setVisibility] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  console.log(errors);

  const router = useRouter();

  useEffect(() => {
    router.push("https://mysteps.freedomcare.com/auth/signin");
  }, []);

  if (window.location.href.includes("fc-iss-server.herokuapp.com"))
    router.push("https://mysteps.freedomcare.com/auth/signin");

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log(res);
      res?.status === 200 ? router.push("/") : setError(res?.error);
    } catch (error) {
      console.log(error);
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
    <div className="relative w-[100vw] h-[100vh] flex">
      <div className="w-full lg:w-[50%] h-[100%] bg-[url('../utils/background.png')] flex justify-center items-center ">
        <div className="w-[450px] md:h-[550px] lg:h-[550px] xl:h-[550px] h-full bg-white  lg:rounded-md shadow-lg opacity-100 shadow-black ">
          <div className="h-[20%] flex justify-center items-center  ">
            <Image
              src={logo}
              alt="Freedom care logo"
              className="w-[300px] h-auto"
              priority
            />
          </div>

          <form
            autoComplete="off"
            className="h-[80%] flex flex-col  p-5 justify-evenly items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {(errors?.email?.message || errors?.password?.message) && (
              <div className="w-3/4 h-10 flex items-center justify-center border-red-400 border-2 rounded-md bg-red-200">
                {errors?.email?.message || errors?.password?.message}
              </div>
            )}
            <div
              className={`w-3/4 h-10 flex items-center justify-center  ${
                error ? "block" : "hidden"
              } border-${alertType(
                "error"
              )}-400 border-2 rounded-md bg-${alertType("error")}-200`}
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
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
            </label>

            <label className="w-3/4 md:w-3/4 lg:w-3/4  flex flex-col">
              Password:
              <input
                className="w-full"
                type={visibility ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                {...register("password", { required: "Password is required" })}
              />
            </label>
            <div className="w-3/4 md:w-3/4 lg:w-3/4  flex items-center justify-start">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                value="Paneer"
                className="mr-2"
                onChange={() => setVisibility((prev) => !prev)}
              />
              Show password
            </div>

            <div className="flex w-full justify-evenly ">
              <p
                className="text-blue-800 cursor-pointer"
                onClick={() => router.push("/auth/forgot_password")}
              >
                Forgot password
              </p>
              {/* <p
                className="text-blue-800 cursor-pointer"
                onClick={() => router.push("/auth/register/step_1")}
              >
                Register
              </p> */}
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
        </div>
      </div>
      <div className="lg:block shadow-2xl  shadow-black hidden lg:w-[50%] h-full bg-[url('../utils/caregiver.jpg')] bg-cover bg-no-repeat bg-right"></div>
    </div>
  );
};

export default SignIn;
