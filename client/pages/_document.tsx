import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css"
        />
      </Head>
      <body id={"bootstrap-overrides"}>
        <div className="main-container">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
