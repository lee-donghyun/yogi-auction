import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../components/Button";
import InlineLoading from "../../../../components/InlineLoading";
import SEO from "../../../../components/SEO";
import { getItem, placeOption } from "../../../../services/api/firebase";
import useForm from "../../../../services/hooks/useForm";
import { getUuid } from "../../../../services/utils";

const PlaceBid: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  item,
}) => {
  const router = useRouter();
  const { option } = router.query;

  const { data, onChange, onSubmit, isLoading, isValid } = useForm(
    {
      bidPrice: 0,
    },
    async (data) => {
      try {
        const optionId = getUuid();
        await placeOption("bids", {
          item: {
            id: item.id,
            name: item.name,
          },
          option: {
            id: optionId,
            name: String(option),
            price: data.bidPrice,
          },
        });
        await router.push("/bids");
      } catch (error) {
        alert("다시 시도해주세요.");
      }
    },
    (data) => !!data.bidPrice
  );

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
                <label htmlFor="bid-price">구매 희망가</label>
              </div>
              <div className="relative mt-2">
                <span className="absolute left-2 top-1/2 -translate-y-1/2">
                  ₩
                </span>
                <input
                  id="bid-price"
                  value={
                    data.bidPrice ? Number(data.bidPrice).toLocaleString() : ""
                  }
                  onChange={onChange}
                  name="bidPrice"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  data-format="comma"
                  data-type="number"
                  className="border rounded w-full p-2 text-right font-semibold"
                />
              </div>
            </div>
            <div>
              <div className="mt-10">
                <Button
                  submit
                  mode="fill"
                  theme={isValid ? undefined : "#ebebeb"}
                >
                  <InlineLoading isLoading={isLoading} label="Place Bid" />
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

export default PlaceBid;

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
