import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import Head from 'next/head';

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
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    </Head>
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
          <Component {...pageProps} />
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
