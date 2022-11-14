import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import logo from "../../../utils/Logo-Orange.svg";
import { nextButtonStyle } from "../../../utils/constants";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const step_1 = () => {
  const [scrollAnim, setScrollAnim] = useState(false);

  return (
    <div className="w-full h-full  bg-[url('../utils/background.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div
        className="w-full h-full lg:w-[60%] lg:h-[85%]   bg-white rounded-md shadow-black shadow-xl overflow-y-auto "
        onScroll={() => setScrollAnim(true)}
      >
        <div className="w-full h-[10%] justify-center flex">
          <Image
            src={logo}
            className=" w-[250px] lg:w-[400px] h-auto"
            alt="freedom care logo"
            priority
          />
        </div>
        <hr />

        <div className="w-full h-[90%] flex ">
          <form className="w-full h-full flex flex-wrap">
            {/*  */}
            <div className="w-[100%] md:w-[50%]  lg:w-[50%]  h-[80%]  flex flex-col justify-evenly items-center">
              <div className="w-[100%] md:w-[85%] lg:w-[70%] h-full flex flex-col items-center justify-evenly">
                <div className=" flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[45%] lg:w-[45%]">
                    First Name:{" "}
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full"
                    />
                  </label>

                  <label className="w-[46%]  md:w-[45%] lg:w-[45%]">
                    Last Name:
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full"
                    />
                  </label>
                </div>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Email Address:
                  <input type="email" placeholder="Email" className="w-full" />
                </label>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Phone Number:
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-[100%]"
                  />
                </label>

                <label className="w-[95%] md:w-full lg:w-full ">
                  Date of Birth:
                  <input type="date" className="w-full" />
                </label>

                <div className="flex justify-evenly md:justify-between lg:justify-between">
                  <label className="w-[46%] md:w-[%] lg:w-[45%]">
                    Password:
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full"
                      autoComplete="new-password"
                    />
                  </label>

                  <label className="w-[46%] md:w-[50%] lg:w-[45%]">
                    Confirm Password:
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full"
                      autoComplete="new-password"
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
            <div className="h-[10%] flex justify-around items-center w-full">
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
