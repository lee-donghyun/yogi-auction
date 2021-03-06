import type { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { VscChevronRight } from "react-icons/vsc";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { useAuth } from "../services/hooks/useAuth";

const Menu: NextPage = () => {
  const [isAuthorized, load, clear] = useAuth();
  return (
    <div>
      <SEO />
      <div className="pb-36 min-h-screen">
        <ul>
          <li>
            <MenuItem href="/user" name="내 정보 수정" />
          </li>
          <li>
            <MenuItem href="/item/register" name="상품 등록" />
          </li>
          <li>
            <MenuItem href="/transaction" name="진행 중 거래" />
          </li>
          <li>
            <MenuItem href="/bids" name="구매 입찰 내역" />
          </li>
          <li>
            <MenuItem href="/asks" name="판매 입찰 내역" />
          </li>
        </ul>
        {isAuthorized && (
          <button
            className="text-gray-300 text-sm underline ml-4 mt-10"
            onClick={clear}
          >
            로그아웃
          </button>
        )}
      </div>
      <Naviagtion />
    </div>
  );
};

export default Menu;

const MenuItem: FC<{ href: string; name: string }> = ({ href, name }) => (
  <Link href={href}>
    <a>
      <div className="flex items-center justify-between p-4">
        {name}
        <VscChevronRight className="text-xl font-bold" />
      </div>
    </a>
  </Link>
);
