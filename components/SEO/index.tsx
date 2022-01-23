import Head from "next/head";
import { FC } from "react";

type Props = { title?: string; image?: string };
const SEO: FC<Props> = ({ title, image }) => {
  title = title ? title + " - 요기옥션" : "요기옥션";
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default SEO;
