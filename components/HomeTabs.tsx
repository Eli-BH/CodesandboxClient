import { Tab } from "@headlessui/react";

import { BsCheckSquareFill, BsThreeDots } from "react-icons/bs";

import { IoSquareOutline } from "react-icons/io5";

import { AiOutlineDoubleRight } from "react-icons/ai";
import { menuItems } from "../utils/constants";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineCircle } from "react-icons/md";
import { useSession } from "next-auth/react";

import cron from "node-cron";
import axios from "axios";

const HomeTabs = (): JSX.Element => {
  const resolutions = {
    homeTab100: "h-[95%]",
    homeTab150: "h-[90%]",
  };

  const router: NextRouter = useRouter();
  const [userInfo, setUserInfo]: any = useState(null);
  const [check, setCheck] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/user/getuser", {
          email: data?.user?.email,
        });

        setUserInfo(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const id = setInterval(async () => {
      const res = await axios.post(
        "https://mysteps.freedomcare.com/api/checkForSfid",
        {
          email: data?.user?.email,
        }
      );

      if (res.data.success) {
        setCheck(true);
      }
    }, 5000);

    if (check === true) {
      console.log("done");
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [check]);

  const statusIcon = (status: string): JSX.Element | null => {
    switch (status) {
      case "incomplete":
        return <IoSquareOutline className="text-3xl" />;

      case "pending":
        return (
          <div className="bg-green-500 border border-green-500 rounded ">
            <BsThreeDots className="text-2xl text-white" />
          </div>
        );

      case "complete":
        return <BsCheckSquareFill className="text-2xl text-green-600" />;

      default:
        return null;
    }
  };
  let capitalize = (word: string): string => {
    let firstLetter: string = word.charAt(0);
    let firstLetterCap: string = firstLetter?.toUpperCase();
    let remainingLetters: string = word.slice(1);
    const capitalizedWord: string = firstLetterCap + remainingLetters;

    return capitalizedWord;
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
            {userInfo &&
              Object.values(userInfo && userInfo?.flags).map(
                (item: any, index) => (
                  <div
                    className={`
                hover:bg-gray-100
                w-[100%]
                justify-between
                items-center
                flex
                text-xs
                md:text-xl
                lg:text-[1.5em]
                
                ${index > 2 && "hidden"}
                ${
                  item.status === "complete"
                    ? "bg-gray-300"
                    : "hover:bg-gray-100 cursor-pointer"
                }
                `}
                    key={index}
                    onClick={
                      item.status === "complete"
                        ? () => null
                        : () => router.push(item.link)
                    }
                  >
                    <div className="flex bg-white border-2 text-xs md:text-md border-gray-500 w-[100px]  lg:w-[150px]  items-center justify-evenly rounded-full py-2">
                      {statusIcon(item.status)}
                      <p className="font-semibold">{capitalize(item.status)}</p>
                    </div>

                    <p className="font-bold">{item.title}</p>

                    <AiOutlineDoubleRight className="w-[50px] md:w-[90px] lg:w-[75px]" />
                  </div>
                )
              )}
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
            {userInfo &&
            userInfo.userType === "Caregiver" &&
            userInfo.patient ? (
              menuItems?.patient.map((item, index) => (
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
              ))
            ) : (
              <p className="text-[1.2rem] md:text-[3rem] lg:text-[4rem] font-bold text-orange-200 ">
                Coming Soon
              </p>
            )}
          </div>
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
};

export default HomeTabs;
