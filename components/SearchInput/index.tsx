import { useRouter } from "next/router";
import { FC } from "react";
import { DebounceInput } from "react-debounce-input";
import { VscClose, VscSearch } from "react-icons/vsc";
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

  return (
    <div className="p-5 fixed inset-0 bottom-auto z-10">
      <form onSubmit={onSubmit}>
        <div className="relative mt-1">
          <DebounceInput
            type="search"
            inputMode="search"
            className="border rounded w-full p-2 bg-white"
            value={query}
            onChange={onChange}
            list="recommends"
            autoFocus
          />
          <datalist id="recommends">
            {recommends.map((recommend) => (
              <option value={recommend} key={recommend}>
                {recommend}
              </option>
            ))}
          </datalist>
          <button className="absolute w-10 h-10 flex items-center justify-center right-0 top-1/2 -translate-y-1/2">
            <VscSearch className="fill-black" />
          </button>
        </div>
      </form>
      {(!router.query.q || !query) && (
        <div className="py-5 mt-5 bg-white">
          <p className="text-lg font-semibold">최근 검색어</p>
          <ul className="mt-2 space-y-1">
            {recentKeywords?.map((keyword) => (
              <li key={keyword}>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      onChange({ target: { value: keyword } });
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
      )}
    </div>
  );
};

export default SearchInput;
