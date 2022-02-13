import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import Button from "../../../../components/Button";
import SEO from "../../../../components/SEO";
import Trade from "../../../../components/Trade";
import { getItem } from "../../../../services/api";

const Ask: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item,
}) => {
  console.log(item);

  return (
    <>
      <SEO title={item.name} />
      <div>
        <Trade
          options={item.asks}
          render={({ selected }) => (
            <>
              <Button
                href={{
                  pathname: `/item/${item.id}/ask/place`,
                  query: { option: selected },
                }}
                replace
              >
                Place Ask
              </Button>
              <Button
                href={{
                  // 회원이 아니면 로그인 페이지, 맞으면 마이 페이지 내 진행 중 거래 페이지.
                  pathname: `/checkout`,
                }}
                mode="fill"
              >
                Sell Now
              </Button>
            </>
          )}
        />
        <div className="fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]  bg-white border-t border-black">
          <Link href={`/item/${item.id}`} replace>
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
  const id = context?.params?.id + "";

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
