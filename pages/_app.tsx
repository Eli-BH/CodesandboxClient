import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

export default function App({
  Component,
  pageProps,
}: AppProps): JSX.Element | null {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  const resolutions = {
    nav100 : "h-[10vh]",
    nav150 : "h-[12vh]",
    mainContent100 : "flex w-full h-[90vh]",
    mainContent150 : "flex w-full h-[88vh]",
  }


  return (
    <div
      className="
      w-[100vw]
      m-auto
      overflow-hidden
      portrait:h-[100vh]
      bg-white
    "
    >
    
      <div className={window.devicePixelRatio >= 1.5 ? resolutions.nav150 : resolutions.nav100 }>
        <Navbar />
      </div>
      <div
        className={window.devicePixelRatio >= 1.5 ? resolutions.mainContent150 : resolutions.mainContent100 }
      >
        <LeftSidebar />
        <div className="h-full w-full">
          <Component {...pageProps} />
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
