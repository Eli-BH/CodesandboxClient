import { Tab } from "@headlessui/react";

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
          Caregiver Content
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
          Patient Content
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default HomeTabs;
