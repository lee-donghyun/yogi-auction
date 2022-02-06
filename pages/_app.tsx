import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import Auth from "../components/Auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <title>요기옥션</title>
      </Head>
      <div className="xl:p-32">
        <RecoilRoot>
          <Auth pages={["/menu"]}>
            <Component {...pageProps} />
          </Auth>
        </RecoilRoot>
      </div>
    </>
  );
}

export default MyApp;
