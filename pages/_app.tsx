import "../styles/globals.css";

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


NProgress.configure({ parent: '#mainContainer' });

NProgress.configure({ showSpinner: false });

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
      h-[100vh]
      overflow-hidden
      portrait:h-[100vh]
      bg-white
    "
    >
      <Component {...pageProps} />
    </div>
  );
}