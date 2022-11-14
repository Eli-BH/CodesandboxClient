import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import logo from "../../../utils/Logo-Orange.svg";
import { nextButtonStyle } from "../../../utils/constants";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

const step_1 = () => {
  const [scrollAnim, setScrollAnim] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log({ errors });
  const errorStyle = "border-red-600 bg-red-100";

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
                        pattern: /^[A-Za-z]+$/,
                        required: true,
                      })}
                    />
                    <div className="absolute w-[100%] h-[40px]  border rounded-sm border-black ">
                      <p>{errors.firstName && errors.firstName.type}</p>
                    </div>
                  </label>

                  <label className="w-[46%]  md:w-[45%] lg:w-[45%]">
                    Last Name:
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={`w-full border border-black rounded-sm ${
                        errors.lastName && errorStyle
                      }`}
                      {...register("lastName", {
                        pattern: /^[A-Za-z]+$/,
                        required: true,
                      })}
                    />
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
                      pattern: emailRegex,
                      required: true,
                    })}
                  />
                </label>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Phone Number:
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className={`w-[100%] border border-black rounded-sm ${
                      errors.phone && errorStyle
                    }`}
                    {...(register("phone"), { required: true })}
                  />
                </label>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Date of Birth:
                  <input
                    type="date"
                    className={`w-full border border-black rounded-sm`}
                    {...(register("dateOfBirth"), { required: true })}
                  />
                </label>

                <div className="flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[%] lg:w-[45%]">
                    Password:
                    <input
                      type="password"
                      placeholder="Password"
                      className={`w-full border border-black rounded-sm ${
                        errors.password && errorStyle
                      }`}
                      autoComplete="new-password"
                      {...(register("password"), { required: true })}
                    />
                  </label>

                  <label className="w-[46%] md:w-[50%] lg:w-[45%]">
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
                <label className="w-[95%] md:w-full lg:w-full ">
                  Address:
                  <input className="w-full" type="text" placeholder="Address" />
                </label>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Address2:
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Apartment, suite, etc."
                  />
                </label>
                <label className="w-[95%] md:w-full lg:w-full ">
                  City/Town:
                  <input className="w-full" type="text" placeholder="City" />
                </label>
                <label className="w-[95%] md:w-full lg:w-full ">
                  State:
                  <input className="w-full" type="text" placeholder="State" />
                </label>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Zip:
                  <input className="w-full" type="text" placeholder="Zip" />
                </label>
              </div>
            </div>

            <hr />
            <div className="h-[10%] flex justify-around items-center w-full py-[50px] md:py-0">
              <button className={nextButtonStyle}>Back</button>
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

export default step_1;
