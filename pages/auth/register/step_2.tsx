import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import logo from "../../../utils/Logo-Orange.svg";
import { nextButtonStyle, statesArr } from "../../../utils/constants";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";

interface IFormInput {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const step_2 = () => {
  const [scrollAnim, setScrollAnim] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<IFormInput>();
  const router: NextRouter = useRouter();
  const errorStyle = "border-red-600 bg-red-100";

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        ...data,
        role: "Caregiver",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  let emailRegex =
    /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return (
    <div className="w-full h-full  bg-[url('../utils/background.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div
        className="w-full h-full lg:w-[60%] lg:h-[85%]   bg-white md:rounded-md lg:rounded-md shadow-black shadow-xl overflow-y-auto "
        onScroll={() => setScrollAnim(true)}
      >
        <div className="w-full h-[10%] justify-center flex">
          <Image
            src={logo}
            className="py-2 w-[250px] lg:w-[400px] h-auto"
            alt="freedom care logo"
            priority
          />
        </div>
        <hr />

        <div className="w-full h-[90%] flex ">
          <form
            className="w-full h-full flex flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/*  */}
            <div className="w-[100%] md:w-[50%]  lg:w-[50%]  h-[80%]  flex flex-col justify-evenly items-center">
              <div className="w-[100%] md:w-[85%] lg:w-[70%] h-full flex flex-col items-center justify-evenly">
                <div className=" flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[45%] lg:w-[45%] relative">
                    First Name:
                    <input
                      type="text"
                      placeholder="First Name"
                      className={`w-full border border-black rounded-sm ${
                        errors.firstName && errorStyle
                      }`}
                      required
                      {...register("firstName", {
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: "Letters only",
                        },
                        required: true,
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 ${
                        errors.firstName ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.firstName && errors.firstName.message}
                      </p>
                    </div>
                  </label>

                  <label className="w-[46%]  md:w-[45%] lg:w-[45%] relative">
                    Last Name:
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={`w-full border border-black rounded-sm ${
                        errors.lastName && errorStyle
                      }`}
                      {...register("lastName", {
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: "Letters only",
                        },
                        required: true,
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                        errors.lastName ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.lastName && errors.lastName.message}
                      </p>
                    </div>
                  </label>
                </div>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Email Address:
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full border border-black rounded-sm ${
                      errors.email && errorStyle
                    }`}
                    autoComplete="on"
                    {...register("email", {
                      pattern: { value: emailRegex, message: "Invalid email" },
                      required: true,
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.email ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.email && errors.email.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative ">
                  Phone Number:
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PatternFormat
                        className={`w-[100%] border border-black rounded-sm ${
                          errors.phone && errorStyle
                        }`}
                        format="1 (###) ###-####"
                        allowEmptyFormatting
                        mask="_"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.phone ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.phone && errors.phone.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative">
                  Date of Birth:
                  <input
                    type="date"
                    className={`w-full border border-black rounded-sm`}
                    {...register("dateOfBirth", {
                      required: true,
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.dateOfBirth ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.dateOfBirth && errors.dateOfBirth.message}
                    </p>
                  </div>
                </label>

                <div className="flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[%] lg:w-[45%] relative">
                    Password:
                    <input
                      type="text"
                      placeholder="Password"
                      className={`w-full border border-black rounded-sm ${
                        errors.password && errorStyle
                      }`}
                      {...register("password", { required: true })}
                    />
                    <div
                      className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                        errors.password ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.password && errors.password.message}
                      </p>
                    </div>
                  </label>

                  <label className="w-[46%] md:w-[50%] lg:w-[45%] relative">
                    Confirm Password:
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className={`w-full border border-black rounded-sm ${
                        errors.confirmPassword && errorStyle
                      }`}
                      autoComplete="new-password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (val: string) => {
                          if (watch("password") != val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                    />
                    <div
                      className={`absolute w-[100%] h-[50px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                        errors.confirmPassword ? "block" : "hidden"
                      }`}
                    >
                      <p className="font-semibold text-red-800">
                        {errors.confirmPassword &&
                          errors.confirmPassword.message}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/*  */}
            <div
              className={`w-full md:hidden lg:hidden flex justify-center flex-col items-center ${
                scrollAnim ? "hidden" : ""
              }`}
            >
              <p className="text-2xl font-sans font-semibold">Scroll down</p>
              <div className=" mt-3  flex items-center justify-center  self-center animate-bounce">
                <HiOutlineChevronDoubleDown className="text-[34px] text-orange-700" />
              </div>
            </div>

            <div className="w-[100%]  md:w-[50%]  lg:w-[50%] h-[80%] flex flex-col items-center">
              <div className="w-[100%] md:w-[85%] lg:w-[70%] h-full flex flex-col items-center justify-evenly">
                <label className="w-[95%] md:w-full lg:w-full relative ">
                  Address:
                  <input
                    className={`w-full border border-black rounded-sm  ${
                      errors.address && errorStyle
                    }`}
                    type="text"
                    placeholder="Address"
                    {...register("address", { required: true })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.address ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.address && errors.address.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative ">
                  Address2:
                  <input
                    className={`w-full border border-black rounded-sm  ${
                      errors.address2 && errorStyle
                    }`}
                    type="text"
                    placeholder="Apartment, suite, etc."
                    {...register("address2")}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.address2 ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.address2 && errors.address2.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative ">
                  City/Town:
                  <input
                    className={`w-full border border-black rounded-sm  ${
                      errors.city && errorStyle
                    }`}
                    type="text"
                    placeholder="City"
                    {...register("city", { required: true })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.city ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.city && errors.city.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative">
                  State:
                  <select
                    placeholder="State"
                    className={`w-full border border-black rounded-sm  ${
                      errors.state && errorStyle
                    }`}
                    {...register("state", {
                      required: {
                        value: true,
                        message: "Please select your state",
                      },
                    })}
                  >
                    {statesArr.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 pl ${
                      errors.state ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.state && errors.state.message}
                    </p>
                  </div>
                </label>

                <label className="w-[95%] md:w-full lg:w-full relative">
                  Zip:
                  <input
                    className={`w-full border border-black rounded-sm  ${
                      errors.zip && errorStyle
                    }`}
                    type="text"
                    placeholder="eg: 11209"
                    {...register("zip", {
                      required: true,
                      maxLength: { value: 5, message: "invalid zip format" },
                      pattern: {
                        value: /^\d{5}$/,
                        message: "invalid zip code format",
                      },
                    })}
                  />
                  <div
                    className={`absolute w-[100%] h-[30px] flex items-center justify-start  border rounded-sm border-red-800 ${
                      errors.zip ? "block" : "hidden"
                    }`}
                  >
                    <p className="font-semibold text-red-800">
                      {errors.zip && errors.zip.message}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <hr />
            <div className="h-[10%] flex justify-around items-center w-full py-[50px] md:py-0">
              <button className={nextButtonStyle} onClick={() => router.back()}>
                Back
              </button>
              <button type="submit" className={nextButtonStyle}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default step_2;
