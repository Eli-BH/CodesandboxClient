import React from "react";
import Image from "next/image";
import logo from "../../../utils/Logo-Orange.svg";
import patient from "../../../utils/examination.png";
import caregiver from "../../../utils/patient.png";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";

const step_1 = () => {
  const router: NextRouter = useRouter();
  return (
    <div className="w-full h-full  bg-[url('../utils/background.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="w-full h-full lg:w-[60%] lg:h-[85%]   bg-white rounded-sm shadow-black shadow-xl overflow-y-auto ">
        <div className="w-full h-[10%] justify-center flex">
          <Image
            src={logo}
            className=" w-[220px] py-5 lg:w-[400px] h-auto"
            alt="freedom care logo"
            priority
          />
        </div>
        <hr />

        <div className="w-full h-[85%] flex flex-col  items-center">
          <p className="text-[1.4em] lg:text-[1.8em] px-5 py-2 font-semibold">
            Are you applying as a Patient or a Caregiver?
          </p>
          <div className="w-full h-full flex flex-wrap">
            <div className="w-full h-[90%] flex justify-evenly items-center">
              {/* Caregiver Panel */}
              <div
                onClick={() => router.push("/auth/register/step_2")}
                className="
                flex 
                flex-col 
                h-[40%]
                md:h-[80%]
                lg:h-[80%] 
                w-[35%] 
                p-4 
                border-2
                border-slate-200
                items-center 
                shadow-md 
                justify-evenly 
                shadow-black  
                rounded-md 
                hover:bg-blue-100 
                hover:shadow-md 
                hover:border-2 
                hover:border-black 
                cursor-pointer 
                transition-all"
              >
                <Image
                  src={caregiver}
                  className="w-[60%]"
                  alt="freedom care logo"
                  priority
                />
                <p className="text-[1.3em] font-semibold">Caregiver</p>

                <p className="border-t pt-4 text-xl hidden md:block lg:block border-gray-800">
                  Become a caregiver for your loved one. When those in need get
                  at-home care from family members, friends, or dedicated home
                  health aides, they live at home longer.
                </p>
              </div>

              {/* Patient panel */}

              <div
                onClick={() => router.push("/auth/register/step_2_patient")}
                className="
                flex 
                flex-col 
                h-[40%]
                md:h-[80%]
                lg:h-[80%] 
                w-[35%] 
                p-4 
                border-2
                border-slate-200
                items-center 
                shadow-md 
                justify-evenly 
                shadow-black  
                rounded-md 
                hover:bg-blue-100 
                hover:shadow-md 
                hover:border-2 
                hover:border-black 
                cursor-pointer 
                transition-all"
              >
                <Image
                  src={patient}
                  className="w-[60%]"
                  alt="freedom care logo"
                  priority
                />
                <p className="text-[1.3em] font-semibold">Patient</p>

                <p className="border-t pt-4 text-xl border-gray-800 hidden  md:block lg:block">
                  Get the help you need from someone you love. Hire a family
                  member or friend to care for you and they’ll get paid. Get
                  ongoing care from a person who loves you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default step_1;
