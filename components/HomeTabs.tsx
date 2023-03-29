import { Tab } from "@headlessui/react";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { FaBell } from "react-icons/fa";
import axios from "axios";

const HomeTabs = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const [userInfo, setUserInfo]: any = useState(null);
  const [check, setCheck] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "https://mysteps.freedomcare.com/api/user/getuser",
          {
            email: data?.user?.email,
          }
        );

        setUserInfo(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(data);

    async function getI9Flag() {
      return await axios.post(
        "https://mysteps.freedomcare.com/api/user/edit_info",
        {
          email: data?.user?.email,
        }
      );
    }

    async function getOtherFlag() {
      return await axios.post(
        "https://mysteps.freedomcare.com/api/user/getUserFlagOther",
        { email: data?.user?.email }
      );
    }

    Promise.all([getI9Flag(), getOtherFlag()]).then(function (results) {
      console.log({ results });
    });
  }, []);

  const flagCheck = setTimeout(async () => {
    try {
      await axios.post(
        "https://mysteps.freedomcare.com/api/user/getUserFlagOther",
        { email: data?.user?.email }
      );

      await axios.post("https://mysteps.freedomcare.com/api/user/edit_info", {
        email: data?.user?.email,
      });

      const res = await axios.post(
        "https://mysteps.freedomcare.com/api/user/getuser",
        {
          email: data?.user?.email,
        }
      );

      setUserInfo(res.data.data);
    } catch (error) {
      // console.log(error);
    }
  }, 5000);

  if (
    userInfo?.flags?.employeeDocs?.status === "complete" ||
    userInfo?.flags?.employeeDocs?.status === "Approved"
  ) {
    clearTimeout(flagCheck);
  }

  //("https://mysteps.freedomcare.com");
  useEffect(() => {
    const id = setInterval(async () => {
      const res = await axios.post("/api/checkForSfid", {
        email: data?.user?.email,
      });

      if (res.data.success) {
        setCheck(true);
      }
    }, 5000);

    if (check === true) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [check]);

  const statusIcon = (status: string): JSX.Element | null => {
    switch (status) {
      case "Requested":
        return (
          <img src="/images/Requested-cropped.svg" className="w-28 md:w-40 " />
        );

      case "pending":
      case "Submitted":
        return (
          <img src="/images/Submitted-cropped.svg" className="w-28 md:w-40 " />
        );

      case "complete":
      case "Approved":
        return (
          <img src="/images/Approved-cropped.svg" className="w-28 md:w-40 " />
        );

      default:
        return (
          <img
            src="/images/NotRequested-cropped.svg"
            className="w-28 md:w-40 "
          />
        );
    }
  };

  console.log(userInfo);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* <div className="w-full h-20 lg:border-b border-gray-400 flex items-center justify-center relative">
          <img
            alt="FreedomCare Logo"
            src="/images/Logo-Orange.svg"
            className="h-9 hidden xl:block"
          />
          <img
            alt="FreedomCare Logo"
            src="/images/FC_Heart.png"
            className="h-9 xl:hidden "
          />

          <FaBell className="text-[#133759] absolute text-2xl xl:text-3xl right-9 hover:text-[#225380] cursor-pointer" />
        </div> */}
        <div className="flex-1 flex gap-3 bg-white ">
          {/* <div className="w-80 border-r border-gray-400 hidden lg:block">
            <p>navbar</p>
          </div> */}
          <div className="h-full flex-1 p-2 bg-white">
            <Tab.Group>
              <Tab.List>
                <Tab className="ui-not-selected:bg-[#133759] font-semibold  ui-not-selected:text-white border-4 border-b-0 mr-1 border-b border-[#133759] h-12 w-40 text-[#133759] rounded-t-md outline-0 relative">
                  <div className="w-full ui-not-selected:hidden absolute text-xl bg-white z-20 text-white -bottom-6">
                    test
                  </div>

                  <p className="z-30 text-xs md:text-lg lg:text-2xl ">
                    Caregiver
                  </p>
                </Tab>
                <Tab className="ui-not-selected:bg-[#133759] absolute ui-not-selected:text-white border-t-2 border-r-2 border-l-2 border-b border-[#133759] h-12 w-40 text-[#133759] rounded-t-md outline-0 hidden ">
                  <div className="w-full ui-not-selected:hidden absolute bg-white text-white -bottom-3">
                    test
                  </div>
                  Patient
                </Tab>
              </Tab.List>
              <Tab.Panels className="border-4  border-[#133759] h-[92%] w-full rounded-md rounded-tl-none">
                <Tab.Panel className="p-3 relative h-full w-full flex items-center">
                  <img
                    src="/images/FC_Heart.png"
                    className="lg:h-80  absolute top-64 right-10 md:top-96 md:right-4 md:h-40  opacity-25 hidden  md:block"
                    alt="FC_Heart"
                  />

                  <table className="h-5/6 outline-none border-spacing-8 ml-2 ">
                    <tbody className="border-spacing-9">
                      <tr>
                        <td>
                          <img
                            src="/images/Approved-cropped.svg"
                            className="w-28 md:w-40 "
                          />
                        </td>
                        <td
                          onClick={() => router.push("/?page=profile")}
                          className="font-semibold text-md md:text-3xl xl:text-4xl"
                        >
                          <p className="ml-2  md:ml-4  lg:ml-16 hover:bg-[#133759] p-2 cursor-pointer hover:text-white rounded-md hover:border-[#DB7F12] hover:shadow-md hover:shadow-black/50 border-white border-2 active:bg-[#225380]">
                            Basic Information
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {statusIcon(
                            userInfo?.flags?.employeeDocs?.status
                          ) || (
                            <img
                              src="/images/NotRequested-cropped.svg"
                              className="w-28 md:w-40 "
                            />
                          )}
                        </td>
                        <td
                          onClick={() =>
                            userInfo?.flags?.employeeDocs?.status ===
                              "Requested" && router.push("/?page=i9")
                          }
                          className="font-semibold text-md md:text-3xl xl:text-4xl "
                        >
                          <p
                            className={`mouse-events-none ml-2 md:ml-4  lg:ml-16 whitespace-nowrap  ${
                              userInfo?.flags?.employeeDocs?.status ==
                                "Requested" &&
                              "hover:bg-[#133759] hover:border-[#DB7F12] hover:shadow-md hover:shadow-black/50 hover:text-white active:bg-[#225380] cursor-pointer"
                            }  p-2  rounded-md   border-white border-2 ${
                              userInfo?.flags?.employeeDocs?.status ==
                                "Awaiting" &&
                              "ml-2  md:ml-4  lg:ml-16 p-2 cursor-not-allowed text-gray-200  border-white border-2"
                            }  `}
                          >
                            Employment Documents
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {statusIcon(userInfo?.flags?.otherTasks?.status) || (
                            <img
                              src="/images/NotRequested-cropped.svg"
                              className="w-28 md:w-40 "
                            />
                          )}
                        </td>
                        <td
                          onClick={() =>
                            userInfo?.flags?.otherTasks?.status ===
                              "Requested" && router.push("/?page=otherDocs")
                          }
                          className="font-semibold text-md md:text-3xl xl:text-4xl "
                        >
                          <p
                            className={`mouse-events-none ml-2 md:ml-4  lg:ml-16 whitespace-nowrap  ${
                              userInfo?.flags?.otherTasks?.status ==
                                "Requested" &&
                              "hover:bg-[#133759] hover:border-[#DB7F12] hover:shadow-md hover:shadow-black/50 hover:text-white active:bg-[#225380] cursor-pointer"
                            }  p-2  rounded-md   border-white border-2 ${
                              (userInfo?.flags?.otherTasks?.status ==
                                "Awaiting" ||
                                userInfo?.flags?.otherTasks?.status == "NR") &&
                              "ml-2  md:ml-4  lg:ml-16 p-2 cursor-not-allowed text-gray-200  border-white border-2"
                            }  `}
                          >
                            Other Documents
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="/images/NotRequested-cropped.svg"
                            className="w-28 md:w-40 "
                          />
                        </td>
                        <td className="font-semibold text-md md:text-3xl xl:text-4xl ">
                          <p className=" ml-2  md:ml-4  lg:ml-16 p-2 cursor-not-allowed text-gray-200  border-white border-2">
                            Health Assessment
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <img
                            src="/images/NotRequested-cropped.svg"
                            className="w-28 md:w-40 "
                          />
                        </td>
                        <td className="font-semibold text-md md:text-3xl xl:text-4xl ">
                          <p className="ml-2  md:ml-4  lg:ml-16 p-2 cursor-not-allowed text-gray-200  border-white border-2">
                            Welcome Orientation
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Tab.Panel>
                <Tab.Panel className="p-3 hidden">Content 2</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTabs;
