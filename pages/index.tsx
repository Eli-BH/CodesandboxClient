import { useState } from "react";
import { useRouter } from "next/router";

import HomeTabs from "../components/HomeTabs";
import SettingsPage from "./SettingsPage";
import ManagePatientsPage from "./ManagePatientsPage";
import ContactPage from "./ContactPage";
import ProfilePage from "./ProfilePage";

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

  console.log(page);

  const resolutions = {
    mainPage100 : "md:w-[100%] lg:w-full h-full rounded-b-lg m-auto bg-gray-100 p-3 pb-5",
    mainPage150 : "md:w-[100%] lg:w-full h-full rounded-b-lg m-auto bg-gray-100 p-3 pb-3"

  }
  
  return (
    <div
      className= {window.devicePixelRatio >= 1.5 ? resolutions.mainPage150 : resolutions.mainPage100 }
    >
    
      {pageRoutes()}
    </div>
  );
}
