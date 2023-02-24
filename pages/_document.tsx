import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <Script  src="//cdn.mouseflow.com/projects/f06ba7d8-a7b6-48fe-941b-fdd2f0f7a01c.js" /> */}
          <Script>
            {`
             
                window._mfq = window._mfq || [];
                (function() {
                  var mf = document.createElement("script");
                  mf.type = "text/javascript"; mf.defer = true;
                  mf.src = "//cdn.mouseflow.com/projects/f06ba7d8-a7b6-48fe-941b-fdd2f0f7a01c.js";
                  document.getElementsByTagName("head")[0].appendChild(mf);
              
            `}
          </Script>
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
