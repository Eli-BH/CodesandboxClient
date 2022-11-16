import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../utils/Logo-Orange.svg";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";

interface IPatientForm {
  email: string;
  password: string;
  confirmPassword: string;
  medicaidId: string;
}

const step_2_patient = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPatientForm>();
  const onSubmit: SubmitHandler<IPatientForm> = async (data) =>
    console.log(data);

  return (
    <div className="w-full h-full  bg-[url('../utils/background.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="w-full h-full lg:w-[60%] lg:h-[85%]   bg-white  lg:rounded-md shadow-black shadow-xl overflow-y-auto ">
        <div className="w-full h-[10%] py-2 justify-center  flex">
          <Image
            src={logo}
            className=" w-[250px] lg:w-[400px] h-auto"
            alt="freedom care logo"
            priority
          />
        </div>
        <hr />

        <div className="w-full h-[90%] flex flex-col items-center ">
          <h2 className="text-[1.6em] lg:text-[2em]">Patient Registration</h2>
          <form
            className="w-full h-full "
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full h-[90%] flex justify-evenly flex-col items-center">
              <label className="w-[95%] md:w-[45%] lg:w-[45%] relative">
                Medicaid ID #:
                <input
                  className="w-full  rounded-sm border-black border"
                  type="text"
                  placeholder="Medicaid ID #"
                  {...register("medicaidId")}
                />
              </label>

              <label className="w-[95%] md:w-[45%] lg:w-[45%] relative ">
                Email:
                <input
                  className="w-full  rounded-sm border-black border"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </label>

              <label className="w-[95%] md:w-[45%] lg:w-[45%] relative">
                Password:
                <input
                  className="w-full  rounded-sm border-black border"
                  type={`${passwordVisibility ? "text" : "password"}`}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </label>

              <label className="w-[95%] md:w-[45%] lg:w-[45%] relative">
                Confirm Password:
                <input
                  className="w-full  rounded-sm border-black border"
                  type={`${passwordVisibility ? "text" : "password"}`}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        console.log({ val, pass: watch("password") });
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {passwordVisibility ? (
                  <AiFillEye
                    className="text-2xl"
                    onClick={() => setPasswordVisibility(false)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="text-2xl"
                    onClick={() => setPasswordVisibility(true)}
                  />
                )}
              </label>
            </div>
            <div className="h-[10%] flex justify-around items-center w-full">
              <button
                type="submit"
                className="border-2 border-[#eb5e1a] px-3 py-2 mb-5  w-[300px] md:w-[300px] lg:w-[300px] rounded-md cursor-pointer hover:transition-all hover:scale-95 hover:shadow-sm hover:bg-[#eb5e1a] hover:border-[#15284b] shadow-md shadow-slate-500 outline-none bg-[#12385a] font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default step_2_patient;
