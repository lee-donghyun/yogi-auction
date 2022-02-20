import type { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { VscChevronRight, VscSymbolArray } from "react-icons/vsc";
import useSWR from "swr";
import Naviagtion from "../../components/Navigation";
import SEO from "../../components/SEO";
import { getUser } from "../../services/api/firebase";

const Menu: NextPage = () => {
  const { data, isValidating } = useSWR("/myinfo", getUser);

  return (
    <div>
      <SEO />
      <div className="min-h-screen">
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
      <Naviagtion />
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
      <div className="flex items-center justify-between p-4">
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
