import { useRouter } from "next/router";
import { FC, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { VscClose, VscSearch, VscArrowLeft } from "react-icons/vsc";
import { UseSearch } from "../../services/hooks/useSearch";

const SearchInput: FC<UseSearch> = ({
  recommends,
  query,
  onChange,
  onSubmit,
  useRecentKeywords,
}) => {
  const router = useRouter();

  const [recentKeywords, setRecentKeywords] = useRecentKeywords;

  const [isKeywordsOpen, setIsKeywordsOpen] = useState(true);

  return (
    <div
      className="p-5 fixed inset-0 bottom-auto z-10"
      style={isKeywordsOpen ? { backgroundColor: "white" } : undefined}
    >
      <form
        onSubmit={(e) => {
          setIsKeywordsOpen(false);
          onSubmit(e);
        }}
      >
        <div className="relative mt-1">
          {isKeywordsOpen && (
            <button
              type="button"
              className="absolute w-10 h-10 flex items-center justify-center left-0 top-1/2 -translate-y-1/2"
              onClick={() => setIsKeywordsOpen(false)}
            >
              <VscArrowLeft />
            </button>
          )}
          <DebounceInput
            type="search"
            inputMode="search"
            className="border rounded w-full p-2 pr-10 bg-white"
            value={query}
            onChange={onChange}
            list="recommends"
            autoFocus
            onFocus={() => setIsKeywordsOpen(true)}
            style={isKeywordsOpen ? { paddingLeft: "2.5rem" } : undefined}
          />
          <button className="absolute w-10 h-10 flex items-center justify-center right-0 top-1/2 -translate-y-1/2">
            <VscSearch className="fill-black" />
          </button>
        </div>
      </form>
      {isKeywordsOpen && (
        <div className="py-5 space-y-5">
          <div>
            <p className="text-lg font-semibold">추천 검색어</p>
            <ul className="mt-2 space-y-1">
              {recommends?.map((keyword) => (
                <li key={keyword}>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        onChange({ target: { value: keyword } });
                        setIsKeywordsOpen(false);
                        router.replace({
                          pathname: "/search",
                          query: { q: keyword, n: Date.now() },
                        });
                      }}
                    >
                      {keyword}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {!recommends?.length && (
              <p className="text-gray-300">추천 검색어가 없습니다.</p>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">최근 검색어</p>
            <ul className="mt-2 space-y-1">
              {recentKeywords?.map((keyword) => (
                <li key={keyword}>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        onChange({ target: { value: keyword } });
                        setIsKeywordsOpen(false);
                        router.replace({
                          pathname: "/search",
                          query: { q: keyword, n: Date.now() },
                        });
                      }}
                    >
                      {keyword}
                    </button>
                    <button>
                      <VscClose
                        onClick={() => setRecentKeywords(keyword, false)}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {!recentKeywords?.length && (
              <p className="text-gray-300">최근 검색어가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
