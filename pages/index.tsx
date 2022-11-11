import { useState } from "react";
import { useRouter } from "next/router";

import HomeTabs from "../components/HomeTabs";
import SettingsPage from "./SettingsPage";
import ManagePatientsPage from "./ManagePatientsPage";
import ContactPage from "./ContactPage";
import ProfilePage from "./ProfilePage";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Image from "next/image";

import Caregiver from "../utils/caregiver.jpg";
import Background from "../utils/background.png";

export default function Home() {
  const router = useRouter();
  const { page } = router.query;

  const pageRoutes = (): JSX.Element => {
    switch (page) {
      case "home":
        return <HomeTabs />;
      case "contact":
        return <ContactPage />;
      case "manage_patients":
        return <ManagePatientsPage />;
      case "settings":
        return <SettingsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomeTabs />;
    }
  };

  const loggedIn: boolean = false;

  const LoggedOut = (): JSX.Element => {
    return (
      <div className="relative w-[100vw] h-[100vh] bg-[url('../utils/background.png')] bg-cover bg-no-repeat  bg-blend-hard-light flex justify-between">
        <div className=" inline-block z-30 w-[20%] h-[50%] bg-white z-100">
          login
        </div>
        <div className="w-[50%] h-[100%]">
          <Image
            src={Caregiver}
            className="w-[100%] h-[100%]"
            alt="FreedomCare users"
          />
        </div>
      </div>
    );
  };

  return loggedIn ? (
    <>
      <div className="h-[10vh]">
        <Navbar />
      </div>
      <div
        className="
      flex
      w-full
      h-[90vh]
    "
      >
        <LeftSidebar />
        <div className="h-full w-full">
          <div
            className="
        md:w-[100%]
        lg:w-full
        h-full
        rounded-b-lg
        m-auto
        bg-gray-100
        p-3
        pb-5
      "
          >
            {pageRoutes()}
          </div>
        </div>

        <RightSidebar />
      </div>
    </>
  ) : (
    <LoggedOut />
  );
}
