import { Tab } from "@headlessui/react";
import {
  MdCheckCircle,
  MdPending,
  MdError,
  MdRemoveCircle,
  MdCancel,
  MdOutlineCircle,
  MdOutlineArrowRight,
} from "react-icons/md";
import { AiOutlineDoubleRight } from "react-icons/ai";
import React, { useState } from "react";

import DemoSettings from "../components/settingsComponents/DemoSettings";

const SettingsPage = (): JSX.Element => {
  const [active, setActive] = useState(false);
  const [activeSetting, setActiveSetting] = useState("");

  const settings: string[] = [
    "Change Name",
    "Change Address",
    "Change Number",
    "Change Password",
  ];
  const links: string[] = ["name", "address", "number", "password", "photo"];

  const resolutions = {
    homeTab100 : "h-[95%]",
    homeTab150 : "h-[100%]"
  }

  const handleClick = (link: string) => {
    setActive(true);
    setActiveSetting(link);
  };

  return (
    <div
      className={
        window.devicePixelRatio >= 1.5
          ? resolutions.homeTab150
          : resolutions.homeTab100
      }
    >
      <Tab.Group>
        <Tab.List>
          <Tab
            className="
              ui-selected:bg-blue-50
              ui-selected:text-black
              ui-not-selected:bg-white
              ui-not-selected:text-gray-800
              ui-selected:border-t-2
              ui-selected:border-x-2
              ui-selected:border-b-green
              border-gray-400
              lg:w-[200px]
              w-[45%]
              p-2
              rounded-t-lg
              font-bold
              outline-0
              mr-1
            "
          >
            Settings
          </Tab>
        </Tab.List>

        <Tab.Panel
          className="
            bg-gray-50
            h-full
            border-x-2
            border-b-2
            border-t-2
            border-gray-400
            rounded-b-lg
            rounded-t-lg
          "
        >
          <div
            className="
            bg-gray-50
            rounded-b-lg
            h-full
            p-2
            lg:p-5
            flex
            justify-items-start
            justify-evenly
            relative
          "
          >
            {/*Unorder List for Settings */}
            <ul
              className={`
            ease-in
            duration-300
            h-full
            w-1/2
            flex
            flex-col
            justify-evenly
            ${
              active
                ? "-translate-x-44 text-left z-0"
                : "translate-x-15 text-center z-10"
            }
            transition-all
            `}
            >
              {settings.map((item, index) => (
                <li
                  key={index}
                  className={`hover:bg-gray-50 w-full cursor-pointer py-5 pl-2 rounded-l-sm ease-in duration-300 ${
                    activeSetting === links[index] && "bg-gray-50"
                  }`}
                  onClick={
                    () => handleClick(links[index])
                    //()=>console.log(links[index])
                  }
                >
                  <p className="text-lg md:text-2xl lg:text-2xl">{item}</p>
                </li>
              ))}
            </ul>

            <div
              className={`
              ease-in
              p-5
              duration-300
              bg-gradient-to-tr from-red-600 to-orange-400
              h-[90%]
              w-1/2
              rounded-sm
              flex
              flex-col
              justify-evenly
              absolute
              ${
                active
                  ? "translate-x-44 opacity-100 z-10"
                  : "opacity-0 translate-x-0 z-0"
              }
              transition-all
              `}
            >
              <DemoSettings setting={activeSetting} />
            </div>
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default SettingsPage;
