import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { VscMenu, VscSearch } from "react-icons/vsc";

const Naviagtion: FC = () => {
  const router = useRouter();

  return (
    <nav
      className={`
        fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] 
      bg-white border-t border-black 
        flex justify-between items-center 
        text-3xl 
      `}
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
    </nav>
  );
};

export default Naviagtion;
