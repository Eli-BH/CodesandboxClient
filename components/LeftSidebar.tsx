import React from "react";
import User from "../utils/user.png";
import { ImLinkedin, ImYoutube, ImFacebook } from "react-icons/im";
import {
  MdPersonAddAlt,
  MdOutlinePermPhoneMsg,
  MdOutlineSettings,
  MdOutlineHome,
} from "react-icons/md";
import { useRouter, NextRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LeftSidebar = () => {
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
      text: "Add a patient",
      icon: <MdPersonAddAlt />,
      link: "manage_patients",
    },
    {
      text: "Settings",
      icon: <MdOutlineSettings />,
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

  const resolutions = {
    profileIcon100: "w-[64px]",
    profileIcon150: "w-[55px]",
  };

  return (
    <div
      className="
        border-r-2
        h-full
        w-[30%]
        items-center
        flex
        flex-col
        hidden
        lg:block
      "
    >
      <div className="border-b-2 border-gray-200 h-[20%] flex-col flex items-center justify-center">
        <Link href="/?page=profile">
          <Image
            src={User}
            alt="profile Image"
            className={
              window.devicePixelRatio >= 1.5
                ? resolutions.profileIcon150
                : resolutions.profileIcon100
            }
          />
        </Link>

        <h2 className="text-2xl font-medium font-sans">
          Hello, {`${userInfo && capitalize(userInfo?.firstName)}` || "Loading"}
          !
        </h2>
      </div>

      <div className="border-b-2 h-[65%] flex flex-col items-center justify-evenly text-xl border-gray-200">
        {items &&
          items.map(
            (item, index): JSX.Element => (
              <Link
                className="w-full flex justify-center"
                href={`/?page=${item.link}`}
                key={index}
              >
                <div
                  className="
                        w-[70%] 
                        text-center 
                        cursor-pointer
                        flex
                        justify-start
                        items-center
                        hover:bg-[#14375a]
                        hover:text-white
                        hover:shadow-xl
                        border-2
                        border-white
                        hover:border-red-300
                        text-2xl
                        p-2
                        rounded-md
                        "
                >
                  {item.icon}
                  <p className=" ml-3 text-sm xxxl:text-2xl font-medium font-sans">
                    {item.text}
                  </p>
                </div>
              </Link>
            )
          )}
        <button
          onClick={() => signOut()}
          className="
      border-2
      p-1
      w-[150px]
      py-2
      text-xl
      rounded-md
      border-[#e85538]
      text-[#e85538]
      hover:text-[#ffffff]
      hover:bg-[#f29b8a]
      cursor-pointer
      shadow-lg
      drop-shadow-lg
      "
        >
          Logout
        </button>
      </div>
      <div className="h-[15%] flex items-center justify-evenly">
        <a href="https://www.facebook.com/freedomcareny/" target="_blank">
          <ImFacebook className="text-[2em]  text-blue-600 cursor-pointer" />
        </a>
        <a
          href="https://www.linkedin.com/company/freedomcareny"
          target="_blank"
        >
          <ImLinkedin className="text-[2em]  text-blue-900 cursor-pointer" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCGaP0_PxlyAhDK9L68goIrQ"
          target="_blank"
        >
          <ImYoutube className="text-[2em] text-red-600   cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default LeftSidebar;
