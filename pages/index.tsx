import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import { pageRoutes } from "../utils/constants";
import { useSession } from "next-auth/react";
import { useEffect, useContext } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const { page } = router.query;

  const resolutions = {
    nav100: "h-[10vh]",
    nav150: "h-[12vh]",
    mainContent100:
      "md:w-[100%] lg:w-full h-full rounded-b-lg m-auto bg-gray-100 p-3 pb-5",
    mainContent150:
      "md:w-[100%] lg:w-full h-[88vh] rounded-b-lg m-auto bg-gray-100 p-3 pb-5",
  };

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
}, [])

const googleTranslateElementInit = () => {

    new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages : "en,es,fr", // include this for selected languages
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element');

}

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status]);
  
  console.log(status);
  return status !== "authenticated" ? (
    <>
      <div
        className={
          window.devicePixelRatio >= 1.5
            ? resolutions.nav150
            : resolutions.nav100
        }
      >
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
        
        <div className="h-full w-full" id="mainContainer">
        {/*<div id="google_translate_element"/>*/}
          <div
            className={
              window.devicePixelRatio >= 1.5
                ? resolutions.mainContent150
                : resolutions.mainContent100
            }
          >
            {pageRoutes(page as string)}
          </div>
        </div>

        <RightSidebar />
      </div>
    </>
  ) : (
    <div className="w-full h-[100%] bg-no-repeat bg-cover bg-[url('../utils/background.png')] flex justify-center items-center">
      <p className="text-[3rem] lg:text-[5rem] font-semibold text-white animate-pulse">
        Loading
      </p>
    </div>
  );
}
