import type { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { VscChevronRight, VscSymbolArray } from "react-icons/vsc";
import useSWR from "swr";
import SEO from "../../components/SEO";
import Skeleton from "../../components/Skeleton";
import { getUser } from "../../services/api/firebase";

const Menu: NextPage = () => {
  const { data, isValidating } = useSWR("/myinfo", getUser);

  return (
    <div>
      <SEO />
      <div className="pb-64 min-h-screen">
        <div className="p-5">
          <h1 className="text-xl">진행중인 거래</h1>
        </div>
        {(!data || (data.transactions.length === 0 && isValidating)) &&
          Array(4)
            .fill(0)
            .map((_, i) => <Skeleton.List key={i} />)}
        {data && !isValidating && !data?.transactions.length && (
          <div className="pt-20 flex flex-col items-center justify-center">
            <VscSymbolArray className="text-2xl" />
            <p className="mt-5 text-lg">진행중인 거래가 없습니다.</p>
          </div>
        )}
        <ul>
          {data?.transactions.map((transaction) => (
            <li key={transaction.id}>
              <TransactionItem
                href={`/transaction/${transaction.id}`}
                name={transaction.item.name}
                createdAt={transaction.createdAt}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]  bg-white border-t border-black">
        <Link href={`/menu`}>
          <a className="ml-5 h-full w-fit flex items-center">
            <span>{`< 메뉴`}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Menu;

const TransactionItem: FC<{
  href: string;
  name: string;
  createdAt: string;
}> = ({ href, name, createdAt }) => (
  <Link href={href}>
    <a>
      <div className="flex items-center justify-between py-3 px-5">
        <div>
          <p>{name}</p>
          <time dateTime={createdAt} className="text-sm text-gray-400">
            {createdAt}
          </time>
        </div>
        <VscChevronRight className="text-xl font-bold" />
      </div>
    </a>
  </Link>
);
