import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { VscMenu, VscSearch } from "react-icons/vsc";

const Naviagtion: FC = () => {
  const router = useRouter();

  return (
    <div
      className="fixed inset-x-0 top-auto h-14 bg-white border-t border-black flex text-3xl justify-between items-center"
      style={{ bottom: "env(safe-area-inset-bottom)" }}
    >
      <Link href="/">
        <a
          className={`ml-5 ${
            router.pathname !== "/search" && router.pathname !== "/menu"
              ? "text-black"
              : "text-gray-300 hover:text-black"
          }`}
        >
          YOGI-AUCTION
        </a>
      </Link>
      <div className="flex justify-between items-center">
        <Link href="/menu">
          <a className="mr-2">
            <VscMenu
              strokeWidth={0.5}
              color="white"
              className={
                router.pathname === "/menu"
                  ? "fill-black"
                  : "fill-gray-300 hover:fill-black"
              }
            />
          </a>
        </Link>
        <Link
          href={{
            pathname: "/search",
            query: { ...(router.pathname === "/search" && router.query) },
          }}
        >
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
