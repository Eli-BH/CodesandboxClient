import React, { useState } from "react";
import { CgMenu, CgClose } from "react-icons/cg";
import {
  MdPersonAddAlt,
  MdOutlinePermPhoneMsg,
  MdOutlineSettings,
  MdOutlineHome,
} from "react-icons/md";
import { ImLinkedin, ImYoutube, ImFacebook } from "react-icons/im";

import Image from "next/image";
import Logo from "../utils/Logo-Orange.svg";
import Link from "next/link";
import User from "../utils/user.png";

const Navbar = () => {
  const [menuShowing, setMenuShowing] = useState<Boolean>(false);

  const items = [
    {
      text: "Home",
      icon: <MdOutlineHome />,
      link: "home",
    },
    {
      text: "Contact Us",
      icon: <MdOutlinePermPhoneMsg />,
      link: "contact",
    },
    {
      text: "Manage Patients",
      icons: <MdPersonAddAlt />,
      link: "manage_patients",
    },
    {
      text: "Settings",
      icons: <MdOutlineSettings />,
      link: "settings",
    },
  ];

  const resolutions = {
    navbarContainer100 : "border-b-2 w-full h-full justify-center flex items-center border-gray-300 shadow-lg shadow-gray-200/100 bg-white",
    navbarContainer150 : "border-b-2 w-full h-15 justify-center flex items-center border-gray-300 shadow-lg shadow-gray-200/100 bg-blue-100",
    logoContainer100 : "md:w-[200px] xs:w-[100px]",
    logoContainer150 : "md:w-[150px] xs:w-[75px] w-1/5"
  }


  return (
    <div
        className={window.devicePixelRatio >= 1.5 ? resolutions.navbarContainer150 : resolutions.navbarContainer100 }
        id="navbarContainer"
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
      <div className={window.devicePixelRatio >= 1.5 ? resolutions.logoContainer150 : resolutions.logoContainer100}>
        <Image
          className="py-2"
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
            ${menuShowing ? "" : "-translate-x-[4000px]"}
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

          <div className="w-full h-full">
            <div
              className="
                border-r-2
                h-full
                w-full
                
                flex
                flex-col
                "
            >
              <div className="border-b-2 border-gray-200 h-[20%] flex-col flex items-center justify-center">
                <Image src={User} alt="profile Image" className="w-[64px] " />

                <h2 className="text-2xl font-medium font-sans">Hello, John</h2>
              </div>

              <div className="border-b-2 h-[65%] flex flex-col items-center justify-evenly text-xl border-gray-200">
                {items &&
                  items.map(
                    (item, index): JSX.Element => (
                      <Link
                        className="w-full"
                        href={`/?page=${item.link}`}
                        key={index}
                        onClick={() => setMenuShowing(false)}
                      >
                        <div className="hover:text-orange-500 w-full text-center  cursor-pointer">
                          <h2 className="text-2xl font-medium font-sans">
                            {item.text}
                          </h2>
                        </div>
                      </Link>
                    )
                  )}
                <button
                  className="
                      border-2
                      p-3
                      w-[150px]
                      text-2xl
                      rounded-md
                      border-[#e85538]
                      text-[#e85538]
                      hover:text-[#ffffff]
                      hover:bg-[#f29b8a]
                      cursor-pointer
                    "
                >
                  Logout
                </button>
              </div>
              <div className="h-[15%] flex items-center justify-evenly">
                <ImFacebook className="text-[2em] text-blue-600 cursor-pointer" />
                <ImLinkedin className="text-[2em] text-blue-900 cursor-pointer" />
                <ImYoutube className="text-[2em] text-red-600   cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
