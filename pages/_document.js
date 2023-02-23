import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add the Mouseflow tracking code here */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              <!-- Mouseflow tracking code -->
              <script type="text/javascript">
              window._mfq = window._mfq || [];
              (function() {
                var mf = document.createElement("script");
                mf.type = "text/javascript"; mf.defer = true;
                mf.src = "//cdn.mouseflow.com/projects/f06ba7d8-a7b6-48fe-941b-fdd2f0f7a01c.js";
                document.getElementsByTagName("head")[0].appendChild(mf);
              })();
              </script>
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
