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
      <Component {...pageProps} />
    </div>
  );
}
