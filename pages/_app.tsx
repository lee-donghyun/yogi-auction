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
        <meta
          name="description"
          content="합리적 거래를 위한 실시간 시장 가격"
        />
      </Head>
      <div>
        <RecoilRoot>
          <Auth
            pages={[
              "/item/register",
              "/item/[id]/ask/place",
              "/item/[id]/bid/place",
              "/item/[id]/sell",
              "/item/[id]/buy",
              "/asks",
              "/bids",
              "/transaction",
              "/user",
            ]}
          >
            <Component {...pageProps} />
          </Auth>
        </RecoilRoot>
      </div>
    </>
  );
}

export default MyApp;
