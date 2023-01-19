import { Tab } from "@headlessui/react";
import Image from "next/image";
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
import User from "../utils/user.png";
import React, {useState} from "react";

const ProfilePage = (): JSX.Element => {

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
          <div
            className="
            rounded-b-lg
            h-full
            p-2
            lg:p-5
            flex
            justify-items-start
            justify-evenly
            items-center
          "
          >
        
          <Image className="
            w-32 
            h-32
            md: 
            w-40
            h-40
            flex
            flex-col
            items-center"
          src={User} 
          alt="profile Image" 
          />
          <div className="
              sm: text-sm
              break-words
              px-4
              md:p-5
              h-[90%]
              w-1/2
              rounded-sm
              flex
              flex-col
              justify-evenly
              border-l-2
              ">
            {/**Will call to logged in users personal info on hand and insert them into p tag */}

            <p>First Name: John </p>
            <p>Last Name: Doe</p>
            <p>Phone Number: (XXX)-XXX-XXXX</p>
            <p>Address: 123 Apple Lane, New York, NY, 12345</p>
            <p>Email: testingUser1234@test.com</p>

            {/*If user logged in is a patient then display this, will do once we are able to pull information <p>Caregiver Name: John Doe</p>*/}

            <p>Number of Patients: 5</p>
            

          </div>
        
        </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default ProfilePage;
