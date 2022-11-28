import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element | null {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <SessionProvider session={pageProps.session}>
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
    </SessionProvider>
  );
}