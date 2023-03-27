import React, { useState, useEffect } from "react";
import { CgMenu, CgClose } from "react-icons/cg";
import {
  MdPersonAddAlt,
  MdOutlinePermPhoneMsg,
  MdOutlineSettings,
  MdOutlineHome,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import User from "../utils/user.png";
import axios from "axios";
import {
  FaBell,
  FaTasks,
  FaHandHoldingMedical,
  FaKeyboard,
} from "react-icons/fa";

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

  userInfo && console.log("TARGET:" + userInfo);
  const items = [
    {
      text: "Tasks",
      icon: <FaTasks />,
      link: "home",
    },
    {
      text: "Contact Us",
      icon: <MdOutlinePermPhoneMsg />,
      link: "contact",
    },
    {
      text: "Patients",
      icon: <FaHandHoldingMedical />,
      link: "manage_patients",
    },
    {
      text: "Helpdesk",
      icon: <FaKeyboard />,
      link: "manage_patients",
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
      className=" md:border-b-2  w-full h-20 justify-center flex items-center border-gray-300 bg-white relative"
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
        onDoubleClick={() =>
          alert(
            `i9: https://freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=${userInfo?.ID}&ShowRecordType=EmploymentDocs&state=NY \n \n` +
              `Other: https://freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=${userInfo?.ID}&ShowRecordType=OtherDocs&state=NY`
          )
        }
      />
      <img
        alt="FreedomCare Logo"
        src="/images/FC_Heart.png"
        className="h-9 xl:hidden "
        onDoubleClick={() =>
          alert(
            `i9: https://freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=${userInfo?.ID}&ShowRecordType=EmploymentDocs&state=NY \n\n` +
              `other: https://freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=${userInfo?.ID}&ShowRecordType=OtherDocs&state=NY`
          )
        }
      />

      {/* <FaBell className="text-[#133759] absolute text-2xl xl:text-3xl right-9 hover:text-[#225380] cursor-pointer" /> */}
      <FaBell className="text-white absolute text-2xl xl:text-3xl right-9 " />

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
                    (item, index): JSX.Element =>
                      index === 1 ? (
                        <a
                          href="tel:877-771-5875"
                          className={`w-full ${
                            index > 1 && "pointer-events-none"
                          }`}
                          key={index}
                        >
                          <div
                            className={` w-full text-center  cursor-pointer ${
                              index > 1 && "text-gray-200"
                            }`}
                          >
                            <h2 className="text-2xl font-medium font-sans">
                              {item.text}
                            </h2>
                          </div>
                        </a>
                      ) : (
                        <Link
                          className={`w-full ${
                            index > 1 && "pointer-events-none"
                          }`}
                          href={`/?page=${item.link}`}
                          key={index}
                          onClick={() => setMenuShowing(false)}
                        >
                          <div
                            className={` w-full text-center  cursor-pointer ${
                              index > 1 && "text-gray-200"
                            }`}
                          >
                            <h2 className="text-2xl font-medium font-sans">
                              {item.text}
                            </h2>
                          </div>
                        </Link>
                      )
                  )}
              </div>
              <div
                className="w-full  flex
                      items-center 
                      justify-center pt-4"
              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
