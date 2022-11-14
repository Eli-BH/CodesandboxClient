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

const SettingsPage = (): JSX.Element => {

  const resolutions = {
    homeTab100 : "h-[95%]",
    homeTab150 : "h-[90%]"
  }

  return (
    <div className={window.devicePixelRatio >= 1.5 ? resolutions.homeTab150 : resolutions.homeTab100 }>
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
            bg-blue-50
            h-full
            border-x-2
            border-b-2
            border-t
            border-gray-400
            rounded-b-lg
          "
        >
          <div
            className="
            h-full
            p-2
            lg:p-5
            flex
            flex-col
            justify-items-start
            justify-evenly
          "
          >
            <div>
              <h2>My Account</h2>
              {/*Unorder List for Settings */}
              <ul>
                <li><a href="">Testing 1</a></li>
                <li><a href="">Testing 2</a></li>
                <li><a href="">Testing 3</a></li>
                <li><a href="">Testing 4</a></li>
              </ul>
            </div>
            
            
            
            <div>
              <h2>Dark Mode</h2>
              {/*Dark Mode Toggle will go here */}
            </div>




          </div>
        </Tab.Panel>

        
      </Tab.Group>
    </div>
  );
};

export default SettingsPage;
