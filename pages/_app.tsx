import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import LogRocket from "logrocket";
import Head from "next/head";

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

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                <!-- Mouseflow: begin -->
                <script type="text/javascript">
                  window._mfq = window._mfq || [];
                  (function() {
                    var mf = document.createElement("script");
                    mf.type = "text/javascript"; mf.defer = true;
                    mf.src = "//cdn.mouseflow.com/projects/f06ba7d8-a7b6-48fe-941b-fdd2f0f7a01c.js";
                    document.getElementsByTagName("head")[0].appendChild(mf);
                  })();
                </script>
                <!-- Mouseflow: end -->
              `,
          }}
        />
      </Head>
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
