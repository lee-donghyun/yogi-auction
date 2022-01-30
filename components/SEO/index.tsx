import Head from "next/head";
import { FC } from "react";

type Props = { title?: string; image?: string; description?: string };
const SEO: FC<Props> = ({ title, image, description }) => {
  title = title ? title + " - 요기옥션" : "요기옥션";
  image = image ?? "/images/assets/brand.png";
  description = description ?? "합리적 거래를 위한 실시간 시장가격";
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/images/assets/brand.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/assets/brand.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/assets/brand.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/assets/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/images/assets/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/assets/favicon-96x96.png"
      />
      <link rel="manifest" href="/images/assets/manifest.json" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default SEO;
