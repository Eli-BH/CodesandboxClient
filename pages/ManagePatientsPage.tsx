import { Tab } from "@headlessui/react";


const ManagePatientsPage = () => {
  const resolutions = {
    homeTab100 : "h-[95%]",
    homeTab150 : "h-[100%]"
  }

  
  return (    
    <div className={window.devicePixelRatio >= 1.5 ? resolutions.homeTab150 : resolutions.homeTab100 }>
      <Tab.Group>
        <Tab.Panel
          className="
            bg-white
            h-full
            border-x-2
            border-b-2
            border-t-2
            border-gray-400
            rounded-b-lg
            rounded-t-lg
          "
        >
          Manage Patients
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default ManagePatientsPage;
