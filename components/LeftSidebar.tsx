import React from "react";
import User from "../utils/user.png";
import { ImLinkedin, ImYoutube, ImFacebook } from "react-icons/im";
import Image from "next/image";

const LeftSidebar = () => {
  const menuItmes = [
    "Home",
    "Contact Us",
    "Manage Patients",
    "Settings",
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
    </button>,
  ];

  return (
    <div
      className="
        border-r-2
        h-full
        w-[20%]
        items-center
        flex
        flex-col
        hidden
        lg:block
      "
    >
      <div className="border-b-2 border-gray-200 h-[20%] flex-col flex items-center justify-center">
        <Image src={User} alt="profile Image" className="w-[64px] " />

        <h2 className="text-2xl font-medium font-sans">Hello, John</h2>
      </div>

      <div className="border-b-2 h-[65%] flex flex-col items-center justify-evenly text-xl border-gray-200">
        {menuItmes &&
          menuItmes.map((item, index) => (
            <div
              key={index}
              className="hover:text-orange-500 w-full text-center  cursor-pointer"
            >
              <h2 className="text-2xl font-medium font-sans">{item}</h2>
            </div>
          ))}
      </div>
      <div className="h-[15%] flex items-center justify-evenly">
        <ImFacebook className="text-[2em] text-blue-600 cursor-pointer" />
        <ImLinkedin className="text-[2em] text-blue-900 cursor-pointer" />
        <ImYoutube className="text-[2em] text-red-600   cursor-pointer" />
      </div>
    </div>
  );
};

export default LeftSidebar;
