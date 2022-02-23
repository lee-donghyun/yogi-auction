import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Button from "../../../components/Button";
import Naviagtion from "../../../components/Navigation";
import SEO from "../../../components/SEO";
import Swiper from "../../../components/Swiper";
import { getItem } from "../../../services/api/firebase";
import { formatPrice } from "../../../services/utils";

const ItemDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item,
}) => {
  return (
    <>
      <SEO title={item.name} image={item.images[0]} />
      <div>
        <div className="mt-5 p-5">
          <Swiper images={item.images} />
          <h1 className="font-semibold text-2xl mt-9">{item.name}</h1>
          <p className="text-lg mt-1">
            {item.lowestAsk ? formatPrice(item.lowestAsk) : null}
            <span className="text-xs"> (lowest ask)</span>
          </p>
          <div className="mt-4 flex gap-x-4 items-start">
            <div className="w-full">
              <Button href={`/item/${item.id}/ask`} replace>
                Sell
              </Button>
              <div className="mt-3 mr-2">
                {item.bids
                  .filter((bid) => bid.options.length)
                  .slice(0, 3)
                  .map((bid) => (
                    <p
                      className="text-xs text-gray-400 whitespace-pre overflow-hidden text-ellipsis text-right mt-px"
                      key={bid.name}
                    >
                      {bid.name} - {formatPrice(bid.options[0].price)}
                    </p>
                  ))}
              </div>
            </div>
            <div className="w-full">
              <Button mode="fill" href={`/item/${item.id}/bid`} replace>
                Buy
              </Button>
              <div className="mt-3 mr-2">
                {item.asks
                  .filter((ask) => ask.options.length)
                  .slice(0, 3)
                  .map((ask) => (
                    <p
                      className="text-xs text-gray-400 whitespace-pre overflow-hidden text-ellipsis text-right mt-px"
                      key={ask.name}
                    >
                      {ask.name} - {formatPrice(ask.options[0].price)}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h4 className="font-semibold mt-4">Summary</h4>
            <ul className="text-sm mt-1">
              <li className="list-inside list-disc">view : 10</li>
              <li className="list-inside list-disc">like : 10</li>
              <li className="list-inside list-disc">sold : 12</li>
            </ul>
            <h4 className="font-semibold mt-4">Release Date</h4>
            <p className="text-sm mt-1">2022/02/22</p>
            <h4 className="font-semibold mt-4">Description</h4>
            <p className="text-sm mt-1">{item.description}</p>
          </div>
          <div className="pt-52"></div>
        </div>
        <Naviagtion />
      </div>
    </>
  );
};

export default ItemDetail;

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
