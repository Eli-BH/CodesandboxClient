import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import logo from "../../../utils/Logo-Orange.svg";
import { nextButtonStyle } from "../../../utils/constants";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const step_2 = () => {
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
            <div className="w-full h-[90%] flex justify-center">
              <p>Are you applying as a Patient or a Caregiver?</p>
              <div></div>
              <div></div>
            </div>
            <div className="h-[10%] flex justify-around items-center w-full">
              <button
                type="submit"
                className="border-2 border-[#eb5e1a] px-3 py-2  w-[300px] md:w-[300px] lg:w-[300px] rounded-md cursor-pointer hover:transition-all hover:scale-95 hover:shadow-sm hover:bg-[#eb5e1a] hover:border-[#15284b] shadow-md shadow-slate-500 outline-none bg-[#12385a] font-semibold text-white"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default step_2;
