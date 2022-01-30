import { FC } from "react";
import { DebounceInput } from "react-debounce-input";
import { VscSearch } from "react-icons/vsc";
import { UseSearch } from "../../services/hooks/useSearch";

const SearchInput: FC<UseSearch> = ({
  recommends,
  query,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="p-5 fixed inset-0 bottom-auto z-10">
      <form onSubmit={onSubmit}>
        <div className="relative mt-1">
          <DebounceInput
            type="text"
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
    </div>
  );
};

export default SearchInput;
