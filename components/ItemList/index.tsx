import Link from "next/link";
import { FC } from "react";
import { formatPrice } from "../../services/utils";

const ItemList: FC<{ items: Item.Item[] }> = ({ items }) => {
  return (
    <div className="">
      <div className="mt-5">
        <div className="grid grid-cols-2 lg:grid-cols-5 px-5 gap-x-3 lg:gap-x-10 gap-y-8 lg:gap-y-10">
          {items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;

const Item: FC<{ item: Item.Item }> = ({ item }) => {
  return (
    <>
      <div className="relative w-full">
        <Link href={`/item/${item.id}`}>
          <a>
            <div>
              <img
                src={item.images[0]}
                alt={item.name}
                className="p-3 aspect-[3/4] object-contain w-full opacity-0 duration-200"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).setAttribute(
                    "style",
                    "opacity:1;"
                  );
                }}
              />
            </div>
            <div>
              <p className="mt-2 text-ellipsis overflow-hidden whitespace-pre">
                {item.name}
              </p>
              <p className="mt-1 text-gray-700 text-sm">
                Lowest Ask
                <br />
                {item.lowestAsk ? formatPrice(item.lowestAsk) : "no asks"}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};
