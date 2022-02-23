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
    new URLSearchParams(asPath.split("?")[1]).get("option") ?? options[0].name
  );

  return (
    <div className="pb-36 min-h-screen">
      <div className="px-5">
        {options.map((option) => (
          <Option
            key={option.name}
            option={option}
            isActive={option.name === selected}
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
    onClick={() => onClick(option.name)}
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
        {!!option?.options?.length && (
          <p>{formatPrice(option.options[0].price)}</p>
        )}
        {!option?.options?.length && <p>no data</p>}
      </div>
    </div>
  </button>
);
