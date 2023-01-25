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
        console.log(userInfo);
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
              w-1/2
              rounded-sm
              flex
              flex-col
              justify-evenly
              border-l-2
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
              <p>Phone Number: {`${userInfo && userInfo?.phone}` || "-"}</p>
              <p>Address: {`${userInfo && userInfo?.address}` || "-"}</p>
              <p>Email: {`${userInfo && userInfo?.email}` || "-"}</p>
            </div>
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default ProfilePage;
