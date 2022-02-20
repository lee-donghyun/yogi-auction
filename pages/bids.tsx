import type { NextPage } from "next";
import Link from "next/link";
import { FC, useState } from "react";
import { VscClose, VscLoading, VscSymbolArray } from "react-icons/vsc";
import useSWR from "swr";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { deleteOption, getUser } from "../services/api/firebase";
import { formatPrice } from "../services/utils";

const Bids: NextPage = () => {
  const { data, mutate, isValidating } = useSWR<User.User>("/user", getUser);

  return (
    <div>
      <SEO />
      <div className="min-h-screen">
        {data && !isValidating && !data?.bids.length && (
          <div className="pt-20 flex flex-col items-center justify-center">
            <VscSymbolArray className="text-2xl" />
            <p className="mt-5 text-lg">구매 입찰 내역이 없습니다.</p>
          </div>
        )}
        <ul>
          {data?.bids.map((bid) => (
            <li key={bid.option.id}>
              <ItemOption option={bid} mutate={mutate} />
            </li>
          ))}
        </ul>
      </div>
      <Naviagtion />
    </div>
  );
};

export default Bids;

const ItemOption: FC<{ option: User.Option; mutate: () => Promise<any> }> = ({
  option,
  mutate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClickDelete = async (e: any) => {
    e.preventDefault();
    if (!isLoading) {
      try {
        setIsLoading(true);
        await deleteOption("bids", option);
        await mutate();
      } catch (error) {
        alert("다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Link href={`/item/${option.item.id}`}>
      <a>
        <div className="flex items-center justify-between p-4">
          <div>
            <p>{option.item.name}</p>
            <p className="text-sm mt-1">
              {option.option.name} {formatPrice(option.option.price)}
            </p>
          </div>
          {!isLoading && (
            <button onClick={onClickDelete}>
              <VscClose className="text-xl font-bold" />
            </button>
          )}
          {isLoading && <VscLoading className="text-xl animate-spin" />}
        </div>
      </a>
    </Link>
  );
};