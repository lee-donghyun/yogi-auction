import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../../components/Button";
import InlineLoading from "../../../components/InlineLoading";
import SEO from "../../../components/SEO";
import { addTransaction, getItem } from "../../../services/api/firebase";

const BuyNow: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item,
}) => {
  const router = useRouter();
  const { option } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { id, placer, price } =
        item.asks.find((ask) => ask.name === option)?.options[0] ?? {};
      await addTransaction("buy", {
        item: {
          id: item.id,
          name: item.name,
        },
        option: {
          id: id ?? "",
          placer: placer ?? "",
          price: price ?? 0,
          name: String(option),
        },
      });
      await router.push("/transaction");
    } catch (error) {
      alert("다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title={item.name} />
      <div className="pb-64 min-h-screen">
        <div className="p-5">
          <h1 className="text-xl">{item.name}</h1>
          <p className="text mt-1">{option}</p>
        </div>
        <div className="p-5">
          <form onSubmit={onSubmit} autoComplete="off" noValidate>
            <div>
              <div>
                <label htmlFor="ask-price">구매가</label>
              </div>
              <div className="relative mt-2">
                <span className="absolute left-2 top-1/2 -translate-y-1/2">
                  ₩
                </span>
                <input
                  id="ask-price"
                  readOnly
                  className="border rounded w-full p-2 text-right"
                  value={Number(
                    item.asks.find((ask) => ask.name === option)?.options[0]
                      .price
                  ).toLocaleString()}
                />
              </div>
            </div>
            <div>
              <div className="mt-10">
                <Button submit mode="fill">
                  <InlineLoading isLoading={isLoading} label="구매" />
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]  bg-white border-t border-black">
          <Link
            href={{ pathname: `/item/${item.id}/bid`, query: { option } }}
            replace
          >
            <a className="ml-5 h-full w-fit flex items-center">
              <span>{`< 옵션 선택`}</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BuyNow;

export const getStaticProps: GetStaticProps<{
  item: Item.Item;
}> = async (context) => {
  const id = context?.params?.id + "";

  try {
    const { data: item } = await getItem(id);
    return {
      props: {
        item,
      },
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60 * 60,
    };
  }
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
