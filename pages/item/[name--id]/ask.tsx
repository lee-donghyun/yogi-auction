import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import SEO from "../../../components/SEO";
import Trade from "../../../components/Trade";
import { getItem } from "../../../services/api";

const Ask: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item,
}) => {
  console.log(item);

  return (
    <>
      <SEO title={item.name} />
      <div>
        <Trade options={item.ask} mode="ask" />
        <div className="fixed inset-0 top-auto h-14 bg-white border-t border-black">
          <Link href={`/item/${item.name}--${item.id}`} replace>
            <a className="ml-5 h-full w-fit flex items-center">
              <span>{`< ${item.name}`}</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Ask;

export const getStaticProps: GetStaticProps<{
  item: Item.Item;
}> = async (context) => {
  console.log(context.params);
  const [name, id] = (context?.params?.["name--id"] + "")?.split("--") ?? [];

  console.log(id);

  // const item: Item.Item = await (
  //   await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/item/${id}`)
  // ).json();

  const item = getItem(id) as Item.Item;

  return {
    props: {
      item,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  // const items: Item.ListItem[] = await (
  //   await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/item`)
  // ).json();

  return {
    paths: [],
    fallback: "blocking",
  };
};
