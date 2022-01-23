import Link from "next/link";
import { FC } from "react";

const ItemList: FC<{ itemList: Item.List }> = ({ itemList }) => {
  return (
    <div className="">
      <div className="mt-5">
        <div className="grid grid-cols-2 px-5 gap-x-3 gap-y-8">
          {itemList.items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;

const Item: FC<{ item: Item.ListItem }> = ({ item }) => {
  return (
    <>
      <div className="relative w-full">
        <Link href={`/item/${item.name}--${item.id}`}>
          <a>
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="p-3 aspect-[3/4] object-contain w-full"
              />
            </div>
            <div>
              <p className="mt-2 text-ellipsis overflow-hidden whitespace-pre">
                {item.name}
              </p>
              <p className="mt-1 text-gray-700 text-sm">
                Lowest Ask
                <br />
                {item.lowestAsk}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};
