import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import { pageRoutes } from "../utils/constants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status]);

  console.log(data);

  return status === "authenticated" ? (
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
            {pageRoutes(page as string)}
          </div>
        </div>

        <RightSidebar />
      </div>
    </>
  ) : (
    <div>loading</div>
  );
}
