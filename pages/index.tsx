import { useState } from "react";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import start from "../utils/connectSalesforce";
import { pageRoutes } from "../utils/constants";

export default function Home() {
  const router = useRouter();
  const { page } = router.query;

  start();

  const resolutions = {
    nav100 : "h-[10vh]",
    nav150 : "h-[12vh]",
    mainContent100 : "md:w-[100%] lg:w-full h-full rounded-b-lg m-auto bg-gray-100 p-3 pb-5",
    mainContent150 : "md:w-[100%] lg:w-full h-[88vh] rounded-b-lg m-auto bg-gray-100 p-3 pb-5",
  }

  return (
    <>
      <div className={window.devicePixelRatio >= 1.5 ? resolutions.nav150 : resolutions.nav100 }>
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
            className={window.devicePixelRatio >= 1.5 ? resolutions.mainContent150 : resolutions.mainContent100 }
          >
            {pageRoutes(page)}
          </div>
        </div>

        <RightSidebar />
      </div>
    </>
  );
}