import { useRouter } from "next/router";
import { FC, useState } from "react";
import { formatPrice } from "../../services/utils";

type Props = {
  options: Item.Option[];
  render: FC<{ selected: string }>;
};

const Trade: FC<Props> = ({ options, render: Footer }) => {
  const { asPath } = useRouter();
  const [selected, setSelected] = useState(
    new URLSearchParams(asPath.split("?")[1]).get("option") ?? options[0].id
  );

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
      <div className="mt-10 flex gap-x-4 fixed inset-x-0 bottom-[calc(56px+env(safe-area-inset-bottom))] p-5 bg-white border-t">
        <Footer selected={selected} />
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
        <p>{formatPrice(option.price)}</p>
      </div>
    </div>
  </button>
);
