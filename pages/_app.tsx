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

  return (
    <SessionProvider session={pageProps.session}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `<script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3382700,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        </script>`,
          }}
        />
        <Script>
          {`
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
          `}
        </Script>
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
      </head>
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
