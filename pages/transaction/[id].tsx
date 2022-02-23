import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { FC, useState } from "react";
import { VscReport } from "react-icons/vsc";
import useSWR, { SWRConfig } from "swr";
import Button from "../../components/Button";
import Naviagtion from "../../components/Navigation";
import SEO from "../../components/SEO";
import Timeline, { TimelineData } from "../../components/Timeline";
import {
  deleteOption,
  getTransaction,
  getUser,
  updateTransaction,
} from "../../services/api/firebase";
import useClientMemo from "../../services/hooks/useClientMemo";
import { getToken } from "../../services/utils";
import dayjs from "dayjs";
import { DAYJS_FORMAT } from "../../data";
import InlineLoading from "../../components/InlineLoading";
import TimelineSkeleton from "../../components/Timeline/skeleton";

const TransactionDetailPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ fallback, swrKey }) => {
  console.log({ fallback, swrKey });

  return (
    <SWRConfig value={{ fallback }}>
      <SEO />
      <TransactionDetail swrKey={swrKey} />
      <Naviagtion />
    </SWRConfig>
  );
};

export default TransactionDetailPage;

const TransactionDetail: FC<{ swrKey: string }> = ({ swrKey }) => {
  const { data: transaction, mutate } = useSWR(swrKey, getTransaction);
  const { data: buyer } = useSWR(transaction?.buyer, getUser);
  const { data: seller } = useSWR(transaction?.seller, getUser);

  const [isLoading, setIsLoading] = useState(false);

  const timeline: (TimelineData & { status: "future" | "past" })[] = [
    {
      time: transaction?.createdAt ?? "",
      title: "낙찰",
      content: "거래가 확정되었습니다.",
      status: "past",
    },
    {
      time: transaction?.payedAt ?? "48시간 이내",
      title: "입금",
      content: `구매자가 판매자의 정산 계좌(${
        seller?.bankAccount ?? "   "
      })에 낙찰 금액을 입금합니다.`,
      status: transaction?.payedAt ? "past" : "future",
    },
    {
      time: transaction?.sentAt ?? "48시간 이내",
      title: "발송",
      content: `판매자가 구매자의 주소(${
        buyer?.address ?? "   "
      })에 상품을 발송합니다.`,
      status: transaction?.sentAt ? "past" : "future",
    },
    {
      time: transaction?.arrivedAt ?? "5~7일 이내",
      title: "수령",
      content: "구매자가 상품을 수령합니다.",
      status: transaction?.arrivedAt ? "past" : "future",
    },
  ];

  const token = useClientMemo(getToken, []);
  const isBuyer = token == transaction?.buyer;
  const isSeller = token == transaction?.seller;
  const status: Transaction.Status = transaction?.arrivedAt
    ? "ARRIVED"
    : transaction?.sentAt
    ? "SENT"
    : transaction?.payedAt
    ? "PAYED"
    : "CREATED";

  const onPayed = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        if (
          window.confirm(
            `${seller?.bankAccount} 계좌에 ${Number(
              transaction?.option.price
            ).toLocaleString()}원을 입금했습니까?`
          )
        ) {
          await updateTransaction(swrKey, {
            payedAt: dayjs().format(DAYJS_FORMAT),
          });
          await deleteOption(
            transaction?.option.placer === buyer ? "bids" : "asks",
            {
              item: transaction?.item as any,
              option: transaction?.option as any,
            }
          );
          await mutate();
        }
      } catch (error) {
        alert("다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSent = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        if (
          window.confirm(
            `${buyer?.address} 주소에 ${transaction?.item.name} 상품을 발송했습니까?`
          )
        ) {
          await updateTransaction(swrKey, {
            sentAt: dayjs().format(DAYJS_FORMAT),
          });
          await mutate();
        }
      } catch (error) {
        alert("다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onArrived = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        if (window.confirm(`${transaction?.item.name}을 수령했습니까?`)) {
          await updateTransaction(swrKey, {
            arrivedAt: dayjs().format(DAYJS_FORMAT),
          });
          await mutate();
        }
      } catch (error) {
        alert("다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pb-64 min-h-screen">
      <Link href={`/item/${transaction?.item.id}`}>
        <a>
          <div className="p-5">
            <h1 className="text-xl">{transaction?.item.name}</h1>
            <p className="text mt-1">{transaction?.option.name}</p>
          </div>
        </a>
      </Link>
      <div className="p-5">
        {(!buyer || !seller) && <TimelineSkeleton />}
        {!!buyer && !!seller && (
          <Timeline
            past={timeline.filter((timeblock) => timeblock.status === "past")}
            future={timeline.filter(
              (timeblock) => timeblock.status === "future"
            )}
          />
        )}
      </div>
      <div className="p-5">
        {isBuyer && status === "CREATED" && (
          <Button mode="fill" onClick={onPayed}>
            <InlineLoading isLoading={isLoading} label="입금 완료" />
          </Button>
        )}
        {isSeller && status === "PAYED" && (
          <Button mode="fill" onClick={onSent}>
            <InlineLoading isLoading={isLoading} label="발송 완료" />
          </Button>
        )}
        {isBuyer && status === "SENT" && (
          <Button mode="fill" onClick={onArrived}>
            <InlineLoading isLoading={isLoading} label="수령 완료" />
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
  );
};

export const getStaticProps: GetStaticProps<{
  fallback: { [key: string]: Transaction.Transaction };
  swrKey: string;
}> = async (context) => {
  const id = context?.params?.id + "";

  try {
    const transaction = await getTransaction(id);
    return {
      props: {
        swrKey: id,
        fallback: {
          [id]: transaction,
        },
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
