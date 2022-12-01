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
import React, {useState} from "react";

import DemoSettings from '../components/settingsComponents/DemoSettings'

const SettingsPage = (): JSX.Element => {
  
  const [active, setActive] = useState(false);
  const [activeSetting, setActiveSetting] = useState("");

  const settings:string[] = ["Change Name", "Change Address", "Change Number","Change Password", "Change Profile Photo"];
  const links:string[] = ["name", "address", "number", "password", "photo"];

  const resolutions = {
    homeTab100 : "h-[95%]",
    homeTab150 : "h-[100%]"
  }

  const handleClick = (link) =>{
    setActive(true);
    setActiveSetting(link);
  }

  return (
    <div className={window.devicePixelRatio >= 1.5 ? resolutions.homeTab150 : resolutions.homeTab100 }>
      <Tab.Group>
        
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
          <ul className={`
            ease-in
            duration-300
            h-full
            w-1/2
            flex
            flex-col
            justify-evenly
            ${active ? "-translate-x-44 text-left z-0" : "translate-x-15 text-center z-10"}
            transition-all
            `}
          >
           {settings.map((item,index) =>(
            <li key={index} className="hover:bg-gray-100 w-full cursor-pointer py-5 pl-2 rounded-l-sm ease-in duration-300" 
            onClick={
             ()=>handleClick(links[index])
             //()=>console.log(links[index])
            }>{item}</li>
           ))}
          </ul>
            
            <div className={`
              rounded-md
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
              ${active ? "translate-x-44 opacity-100 z-10" : "opacity-0 translate-x-0 z-0"}
              transition-all
              `}>
                <DemoSettings setting={activeSetting}/>
            </div>



         
          </div>
        </Tab.Panel>

        
      </Tab.Group>
    </div>
  );
};

export default SettingsPage;
