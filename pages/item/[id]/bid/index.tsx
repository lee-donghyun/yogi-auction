import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import useSWR from "swr";
import Button from "../../../../components/Button";
import SEO from "../../../../components/SEO";
import Trade from "../../../../components/Trade";
import { getItem } from "../../../../services/api/firebase";
import { getItemQuery } from "../../../../services/utils";

const Bid: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item: fallbackData,
}) => {
  const { data: item } = useSWR(fallbackData.id, getItemQuery, {
    fallbackData,
  });

  return (
    <>
      <SEO title={item?.name} />
      <div>
        <Trade options={item?.asks ?? []}>
          {({ selected, isAvailable }) => (
            <>
              <Button
                href={{
                  pathname: `/item/${item?.id}/bid/place`,
                  query: { option: selected },
                }}
              >
                Place Bid
              </Button>
              <Button
                href={
                  isAvailable
                    ? {
                        pathname: `/item/${item?.id}/buy`,
                        query: { option: selected },
                      }
                    : undefined
                }
                mode="fill"
                theme={isAvailable ? undefined : "#ebebeb"}
              >
                Buy Now
              </Button>
            </>
          )}
        </Trade>
        <div className="fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]  bg-white border-t border-black">
          <Link href={`/item/${item?.id}`} replace>
            <a className="ml-5 h-full w-fit flex items-center">
              <span>{`< ${item?.name}`}</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Bid;

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
  return {
    paths: [],
    fallback: "blocking",
  };
};
