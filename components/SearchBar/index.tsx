import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const SearchBar: FC<{
  query: string;
  onChange: (e: any) => any;
  onSubmit: (e: any) => any;
}> = ({ query, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="fixed bottom-[68px] left-3 right-3 p-1 text-base bg-white border-2 border-black justify-between"
      style={{
        animationName: "fade-in",
        animationDuration: "0.3s",
      }}
    >
      <input
        onChange={onChange}
        type="text"
        value={query}
        placeholder="검색어를 입력해주세요."
        className="outline-none w-full"
      />
    </form>
  );
};

export default SearchBar;
