import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { VscReport } from "react-icons/vsc";
import Button from "../../components/Button";
import Naviagtion from "../../components/Navigation";
import SEO from "../../components/SEO";
import Timeline, { TimelineData } from "../../components/Timeline";
import { getTransaction } from "../../services/api/firebase";
import useClientMemo from "../../services/hooks/useClientMemo";
import { getToken } from "../../services/utils";

const TransactionDetail: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ transaction }) => {
  const timeline: (TimelineData & { status: "future" | "past" })[] = [
    {
      time: transaction.createdAt,
      title: "낙찰",
      content: "거래가 확정되었습니다.",
      status: "past",
    },
    {
      time: transaction.payedAt ?? "48시간 이내",
      title: "입금",
      content: `구매자가 판매자의 정산 계좌()에 낙찰 금액을 입금합니다.`,
      status: transaction.payedAt ? "past" : "future",
    },
    {
      time: transaction.sentAt ?? "48시간 이내",
      title: "발송",
      content: "판매자가 구매자의 주소()에 상품을 발송합니다.",
      status: transaction.sentAt ? "past" : "future",
    },
    {
      time: transaction.arrivedAt ?? "5~7일 이내",
      title: "수령",
      content: "구매자가 상품을 수령합니다.",
      status: transaction.arrivedAt ? "past" : "future",
    },
  ];

  const token = useClientMemo(getToken, []);
  const isBuyer = token == transaction.buyer;
  const isSeller = token == transaction.seller;
  const status: Transaction.Status = transaction.arrivedAt
    ? "ARRIVED"
    : transaction.sentAt
    ? "SENT"
    : transaction.payedAt
    ? "PAYED"
    : "CREATED";

  const onPayed = () => {
    if (window.confirm("(계좌)계좌에 ~원을 입금했습니까?")) {
      // update
    }
  };

  const onSent = () => {
    if (window.confirm("(주소)에 (상품이름)을 발송했습니까?")) {
      // update
    }
  };

  const onArrived = () => {
    if (window.confirm("(상품이름)을 수령했습니까?")) {
      // update
    }
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen pb-32">
        <div className="p-5">
          <h1 className="text-xl">{transaction.item.name}</h1>
          <p className="text mt-1">{transaction.option.name}</p>
        </div>
        <div className="p-5">
          <Timeline
            past={timeline.filter((timeblock) => timeblock.status === "past")}
            future={timeline.filter(
              (timeblock) => timeblock.status === "future"
            )}
          />
        </div>
        <div className="p-5">
          {isBuyer && status === "CREATED" && (
            <Button mode="fill" onClick={onPayed}>
              입금 완료
            </Button>
          )}
          {isSeller && status === "PAYED" && (
            <Button mode="fill" onClick={onSent}>
              발송 완료
            </Button>
          )}
          {isBuyer && status === "SENT" && (
            <Button mode="fill" onClick={onArrived}>
              수령 완료
            </Button>
          )}
        </div>
        <div className="p-5 text-right">
          <Link href={`/report`}>
            <a className="inline-flex">
              <div className="p-5">
                <VscReport className="text-lg text-gray-400" />
              </div>
            </a>
          </Link>
        </div>
      </div>
      <Naviagtion />
    </>
  );
};

export default TransactionDetail;

export const getStaticProps: GetStaticProps<{
  transaction: Transaction.Transaction;
}> = async (context) => {
  const id = context?.params?.id + "";

  try {
    const transaction = await getTransaction(id);
    return {
      props: {
        transaction,
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
