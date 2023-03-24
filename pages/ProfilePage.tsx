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

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = (): JSX.Element => {
  const [userInfo, setUserInfo]: any = useState("");
  const [sfInfo, setSfInfo] = useState({
    lastname: "",
    accountid: "",
    hhax_admission_id__c: null,
    name: "",
    isdeleted: false,
    systemmodstamp: "",
    createddate: "",
    firstname: "",
    sfid: "",
    id: 0,
    _hc_lastop: "",
    _hc_err: null,
    mobilephone: "",
    phone: "",
    email: "",
    primary_language__c: "",
    mailingpostalcode: "",
    mailingstate: "",
    mailingcountry: "",
    mailingstreet: "",
    mailingcity: "",
    ownerid: "",
    birthdate: "",
    homephone: null,
    potential_patients_medicaid_number__c: null,
    caller_type__c: "",
    there_is_a_designated_representative__c: null,
    intake_type__c: null,
    relationship_to_patient__c: null,
    recordtypeid: "",
    medicaid__c: null,
    hhax_caregiver_code__c: "",
    status__c: "",
    lastwebapplogin__c: null,
  });
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      /**Or this https://mysteps.freedomcare.com/api/user/getAllUserInfo */
      try {
        const res = await axios.post(
          "https://mysteps.freedomcare.com/api/user/getAllUserInfo",
          {
            //@ts-ignore
            email: data?.user?.email,
          }
        );
        setUserInfo(res.data.data);
        setSfInfo(res.data.sfData);
      } catch (error) {
        console.log(error);
      }
      console.log(userInfo);
    })();
  }, []);

  let capitalize = (word: string): string => {
    let firstLetter: string = word.charAt(0);
    let firstLetterCap: string = firstLetter?.toUpperCase();
    let remainingLetters: string = word.slice(1);
    const capitalizedWord: string = firstLetterCap + remainingLetters;

    return capitalizedWord;
  };

  const resolutions = {
    homeTab100: "h-[95%]",
    homeTab150: "h-[100%]",
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
            lg:flex-row
            flex-col
            justify-items-start
            justify-evenly
            items-center
          "
          >
            <Image
              className="
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
            <div
              className="
              sm: text-sm
              break-words
              px-4
              md:p-5
              h-[90%]
              w-full
              md:w-1/2
              rounded-sm
              flex
              flex-col
              justify-evenly

              lg:border-l-2
              font-semibold 
              text-xl
              "
            >
              <p>
                First Name:{" "}
                {`${userInfo && capitalize(userInfo?.firstName)}` || "-"}
              </p>
              <p>
                Last Name:{" "}
                {`${userInfo && capitalize(userInfo?.lastName)}` || "-"}
              </p>
              <p>Phone Number: {`${sfInfo && sfInfo?.mobilephone}` || "-"}</p>
              <p>
                Address:{" "}
                {`${sfInfo && sfInfo?.mailingcity}, ${sfInfo?.mailingstreet}, ${
                  sfInfo?.mailingpostalcode
                }, ${sfInfo?.mailingcountry}` || "-"}
              </p>
              <p>Email: {` ${userInfo && userInfo?.email}` || "-"}</p>
            </div>
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default ProfilePage;
