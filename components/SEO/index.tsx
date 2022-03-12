import Head from "next/head";
import { FC } from "react";

type Props = { title?: string; image?: string; description?: string };
const SEO: FC<Props> = ({ title, image, description }) => {
  title = title ? title + " - 요기옥션" : "요기옥션";
  image = image ?? "/images/brand.png";
  description = description ?? "합리적 거래를 위한 실시간 시장가격";
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="description" content={description} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png?v=1"
      />
      <link rel="manifest" href="/site.webmanifest?v=1" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1" color="#000000" />
      <link rel="shortcut icon" href="/images/favicon.ico?v=1" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default SEO;
