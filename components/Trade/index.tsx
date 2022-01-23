import { FC, useState } from "react";
import Button from "../Button";

const textsOnMode = {
  ask: {
    place: "Place Ask",
    now: "Sell Now",
  },
  bid: {
    place: "Place Bid",
    now: "Buy Now",
  },
};

type Props = {
  options: Item.Option[];
  mode: "ask" | "bid";
};

const Trade: FC<Props> = ({ options, mode }) => {
  const [selected, setSelected] = useState(options[0].id);

  return (
    <div className="p-5 pb-64 min-h-screen">
      <div>
        {options.map((option) => (
          <Option
            key={option.id}
            option={option}
            isActive={option.id === selected}
            onClick={setSelected}
          />
        ))}
      </div>
      <div className="mt-10 flex gap-x-4 fixed inset-x-0 bottom-14 p-5 bg-white border-t">
        <Button>{textsOnMode[mode].place}</Button>
        <Button mode="fill">{textsOnMode[mode].now}</Button>
      </div>
    </div>
  );
};

export default Trade;

const Option: FC<{
  option: Item.Option;
  isActive: boolean;
  onClick: (id: string) => any;
}> = ({ option, isActive, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(option.id)}
    className={`
      block w-full py-5 relative rounded border
      ${isActive ? "border-black" : "border-white text-gray-400"}
    `}
  >
    <div>
      <div>
        <p className="text-lg font-semibold">{option.name}</p>
      </div>
      <div>
        <p>{option.price}</p>
      </div>
    </div>
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600">
      {option.quantity === 1 && "마지막 수량"}
    </span>
  </button>
);
