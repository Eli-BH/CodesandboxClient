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
              ui-selected:bg-gray-50
              ui-selected:text-black
              ui-not-selected:bg-gray-500
              ui-not-selected:text-white
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
             ui-selected:bg-gray-50
              ui-selected:text-black
              ui-not-selected:bg-gray-500
              ui-not-selected:text-white
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
            bg-gray-50
            h-full
            
            border-x-2
            border-b-2
            border-t
            border-t-gray-300
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
                bg-gray-200
                w-[90%]
                justify-between
                items-center
                flex
                text-[2em]
                
              "
            >
              <MdOutlineCircle />
              <p>Intake Information</p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Employee Douments </p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Health Assessment </p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Welcome Call</p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Enrollment Orientation</p>
              <AiOutlineDoubleRight />
            </div>
          </div>
        </Tab.Panel>
        <Tab.Panel
          className="
            bg-gray-50
            h-full
            border-x-2
            border-b-2
            border-t
            border-t-gray-300
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
               w-[90%]
            "
          >
            <div>
              <MdOutlineCircle />
              <p>Intake Information </p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Medicaid Nurse Visit</p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Doctor Order - DOH</p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Authorization</p>
              <AiOutlineDoubleRight />
            </div>
            <div>
              <MdOutlineCircle />
              <p>Orientation</p>
              <AiOutlineDoubleRight />
            </div>
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default HomeTabs;
