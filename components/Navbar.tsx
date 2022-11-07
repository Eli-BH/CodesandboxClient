import React, { useState } from "react";
import { CgMenu, CgClose } from "react-icons/cg";

import Image from "next/image";
import Logo from "../utils/Logo-Orange.svg";

const Navbar = () => {
  const [menuShowing, setMenuShowing] = useState<Boolean>(false);

  return (
    <div
      className="
            border-b-2
            w-full
            justify-center
            flex 
            items-center
            border-gray-300
            py-5
            px-4
            shadow-lg
            shadow-gray-200/100
            bg-white
        "
    >
      <CgMenu
        onClick={() => setMenuShowing(true)}
        className="
                justify-center
                block
                lg:hidden
                text-[54px]
                md:left-10
                lg:left-20
                left-2
                absolute
                cursor-pointer
                p-3
                rounded-full
                hover:bg-gray-200
            "
      />
      <div className="md:w-[250px] xs:w-[100px]">
        <Image
          className="cursor-pointer"
          src={Logo}
          alt="Freedom care logo"
          layout="responsive"
        />
      </div>

      <div
        className={`
            absolute
            bottom-0
            top-0
            ${menuShowing ? "" : "-translate-x-[2000px]"}
            h-full
            w-full
            bg-white
            transition-all
        `}
      >
        <div className="relative w-full h-full">
          <CgClose
            className="
                    xs:top-2
                    xs:rigt-2
                    lg:top-10
                    lg:right-10
                    absolute text-[54px]
                    
                "
            onClick={() => setMenuShowing(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
