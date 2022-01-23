import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { VscSearch, VscPerson } from "react-icons/vsc";

const Naviagtion: FC = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 top-auto h-14 bg-white border-t border-black flex text-3xl justify-between items-center">
      <Link href="/">
        <a
          className={`ml-5 ${
            router.pathname !== "/search"
              ? "text-black"
              : "text-gray-300 hover:text-black"
          }`}
        >
          YOGI-AUCTION
        </a>
      </Link>
      <div className="flex justify-between items-center">
        <Link href="/search">
          <a className="mr-5">
            <VscSearch
              strokeWidth={0.5}
              color="white"
              className={
                router.pathname === "/search"
                  ? "fill-black"
                  : "fill-gray-300 hover:fill-black"
              }
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Naviagtion;
