import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import LogRocket from "logrocket";
import Head from "next/head";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element | null {
  const [isSSR, setIsSSR] = useState(true);
  LogRocket.init("znl71w/mysteps");

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  // document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio));

  document
    .querySelector("meta[name=viewport]")
    ?.setAttribute(
      "content",
      "width=device-width, initial-scale=" + 1 / window.devicePixelRatio
    );

  return (
    <SessionProvider session={pageProps.session}>
      <Script src="//cdn.mouseflow.com/projects/f06ba7d8-a7b6-48fe-941b-fdd2f0f7a01c.js" />
      <div
        className="
      w-[100vw]
      m-auto
      h-[100vh]
      overflow-hidden
      portrait:h-[100vh]
      bg-white 
      flex
      flex-col
    "
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
