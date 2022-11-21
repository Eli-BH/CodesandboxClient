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

  return (
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
            {pageRoutes(page)}
          </div>
        </div>

        <RightSidebar />
      </div>
    </>
  );
}
