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

const HomeTabs = (): JSX.Element => {
  return (
    <div className="h-[95%]">
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
            Caregiver
          </Tab>
          <Tab
            className="
              ui-selected:bg-orange-50
              ui-selected:text-black
              ui-not-selected:bg-orange-50
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

        <Tab.Panel
          className="
            bg-blue-50
            h-full
            border-x-2
            border-b-2
  
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
            justify-evenly 
            items-center
          "
          >
            <div
              className="
                hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-sm
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Scheduled</p>
              </div>

              <p className="font-bold">Intake Information</p>
              <AiOutlineDoubleRight className="w-[90px] lg:w-[200px] cursor-pointer" />
            </div>

            <div
              className="
               hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-sm
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Incomplete</p>
              </div>
              <p className="font-bold">Employee Douments </p>
              <AiOutlineDoubleRight className="w-[90px] lg:w-[200px] cursor-pointer" />
            </div>
            <div
              className="
                hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-sm
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold">Health Assessment </p>
              <AiOutlineDoubleRight className="w-[90px] lg:w-[200px] cursor-pointer" />
            </div>
            <div
              className="
               hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-sm
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold">Welcome Call</p>
              <AiOutlineDoubleRight className="w-[90px] lg:w-[200px] cursor-pointer" />
            </div>

            <div
              className="
               hover:bg-gray-100
                w-[98%]
                lg:w-[90%]
                justify-between
                items-center
                flex
                text-xs
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold font-sm">Enrollment Orientation</p>
              <AiOutlineDoubleRight className="w-[90px] lg:w-[200px] cursor-pointer" />
            </div>
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
          "
        >
          <div
            className="
               h-full
            p-5
            flex
            flex-col
            justify-evenly 
            items-center
            "
          >
            <div
              className="
                hover:bg-gray-100
                w-[90%]
                justify-between
                items-center
                flex
                text-md
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Scheduled</p>
              </div>
              <p className="font-bold">Intake Information </p>
              <AiOutlineDoubleRight className="w-[200px] cursor-pointer" />
            </div>

            <div
              className="
                hover:bg-gray-100
                w-[90%]
                justify-between
                items-center
                flex
                text-md
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold">Medicaid Nurse Visit</p>
              <AiOutlineDoubleRight className="w-[200px] cursor-pointer" />
            </div>

            <div
              className="
                hover:bg-gray-100
                w-[90%]
                justify-between
                items-center
                flex
                text-md
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold">Doctor Order - DOH</p>
              <AiOutlineDoubleRight className="w-[200px] cursor-pointer" />
            </div>

            <div
              className="
                hover:bg-gray-100
                w-[90%]
                justify-between
                items-center
                flex
                text-md
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold">Authorization</p>
              <AiOutlineDoubleRight className="w-[200px] cursor-pointer" />
            </div>

            <div
              className="
                hover:bg-gray-100
                w-[90%]
                justify-between
                items-center
                flex
                text-md
                lg:text-[1.5em]
              "
            >
              <div className="flex border-2 border-gray-150 w-[100px] lg:w-[200px] items-center justify-evenly rounded-full px">
                <MdOutlineCircle />
                <p>Requested</p>
              </div>
              <p className="font-bold">Orientation</p>
              <AiOutlineDoubleRight className="w-[200px] cursor-pointer" />
            </div>
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default HomeTabs;
