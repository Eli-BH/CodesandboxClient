import React, { useState, useEffect } from "react";
import { CgMenu, CgClose } from "react-icons/cg";
import {
  MdPersonAddAlt,
  MdOutlinePermPhoneMsg,
  MdOutlineSettings,
  MdOutlineHome,
} from "react-icons/md";
import { ImLinkedin, ImYoutube, ImFacebook } from "react-icons/im";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Logo from "../utils/Logo-Orange.svg";
import Link from "next/link";
import User from "../utils/user.png";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const [menuShowing, setMenuShowing] = useState<Boolean>(false);
  const [userInfo, setUserInfo]: any = useState(null);
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/user/getuser", {
          email: data?.user?.email,
        });

        setUserInfo(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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

  let capitalize = (word: string): string => {
    let firstLetter: string = word.charAt(0);
    let firstLetterCap: string = firstLetter?.toUpperCase();
    let remainingLetters: string = word.slice(1);
    const capitalizedWord: string = firstLetterCap + remainingLetters;

    return capitalizedWord;
  };

  return (
    <div
      className="sm:border-none md:border-b-2  w-full h-20 justify-center flex items-center border-gray-300 bg-white relative"
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

      <img
        alt="FreedomCare Logo"
        src="/images/Logo-Orange.svg"
        className="h-9 hidden xl:block"
      />
      <img
        alt="FreedomCare Logo"
        src="/images/FC_Heart.png"
        className="h-9 xl:hidden "
      />

      <FaBell className="text-[#133759] absolute text-2xl xl:text-3xl right-9 hover:text-[#225380] cursor-pointer" />

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
            z-100
            ease-in
            
        `}
        style={{ zIndex: "100" }}
      >
        <div className="relative w-full h-screen bg-white">
          <CgClose
            className="
                    xs:top-2
                    xs:right-2
                    lg:top-10
                    lg:right-10
                    absolute text-[54px]
                    
                "
            onClick={() => setMenuShowing(false)}
          />

          <div className="w-full h-full z-100">
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

                <h2 className="text-2xl font-medium font-sans">
                  Hello, {`${userInfo && capitalize(userInfo?.firstName)}`}!
                </h2>
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
                  onClick={() => signOut()}
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
