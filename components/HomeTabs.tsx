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
import { FaRegSquare } from 'react-icons/fa';
import { AiOutlineDoubleRight } from "react-icons/ai";
import { menuItems } from "../utils/constants";
import { useRouter, NextRouter } from "next/router";

const HomeTabs = (): JSX.Element => {

  const resolutions = {
    homeTab100 : "h-[95%]",
    homeTab150 : "h-[90%]"
  }

  const router: NextRouter = useRouter();
  return (
    <div className={window.devicePixelRatio >= 1.5 ? resolutions.homeTab150 : resolutions.homeTab100 }>
      <Tab.Group>
        <Tab.List>
          <Tab
            className="
              ui-selected:bg-blue-50
              ui-selected:text-black
              ui-not-selected:bg-blue-100
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
            Caregiver
          </Tab>
          <Tab
            className="
              ui-selected:bg-orange-50
              ui-selected:text-black
              ui-not-selected:bg-orange-100
              ui-not-selected:text-gray-800
              ui-selected:border-t-2
              ui-selected:border-x-2
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
            Patient
          </Tab>
        </Tab.List>

        {/* Caregiver Panel */}

        <Tab.Panel
          className="
            bg-blue-50
            h-full
            border-x-2
            border-b-2
            border-gray-400
            rounded-b-lg
            border-t
          "
        >
          <div
            className="
            h-full
            p-2
            lg:p-5
            flex
            flex-col
            justify-evenly 
            items-center
          "
          >
            {menuItems?.caregiver.map((item, index) => (
              <div
                className="
               hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-xs
                md:text-xl
                lg:text-[1.5em]
              "
                key={index}
              >
                <div className="flex bg-white border-2 text-xs md:text-md border-gray-500 w-[100px]  lg:w-[150px]  items-center justify-evenly rounded-full py-2">
                  <FaRegSquare className="text-xl" />
                  <p>Incomplete</p>
                </div>

                <p className="font-bold">{item.title}</p>
                <AiOutlineDoubleRight
                  className="w-[50px] md:w-[90px] lg:w-[200px] cursor-pointer"
                  onClick={() => router.push(item.link)}
                />
              </div>
            ))}
          </div>
        </Tab.Panel>

        {/* patient panel */}
        <Tab.Panel
          className="
           bg-orange-50
            h-full
            border-x-2
            border-b-2
            border-gray-400
            rounded-b-lg
            border-t
          "
        >
          <div
            className="
            h-full
            p-2
            lg:p-5
            flex
            flex-col
            justify-evenly 
            items-center
            "
          >
            {menuItems?.patient.map((item, index) => (
              <div
                className="
               hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-sm
                md:text-lg
                lg:text-[1.5em]
              "
                key={index}
              >
                <div className="flex bg-white border-2 text-xs md:text-md border-gray-500 w-[100px]  lg:w-[150px]  items-center justify-evenly rounded-full py-2">
                  <MdOutlineCircle className="text-xl" />
                  <p>Incomplete</p>
                </div>
                <p className="font-bold">{item.title}</p>
                <AiOutlineDoubleRight className="w-[50px] md:w-[90px] lg:w-[200px] cursor-pointer" />
              </div>
            ))}
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default HomeTabs;
