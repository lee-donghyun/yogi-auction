const ItemListSkeleton = ({}) => {
  return (
    <div className="">
      <div className="mt-5">
        <div className="grid grid-cols-2 lg:grid-cols-5 px-5 gap-x-3 lg:gap-x-10 gap-y-8 lg:gap-y-10">
          {Array(10)
            .fill(1)
            .map((_, i) => (
              <Item key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItemListSkeleton;

const Item = ({}) => {
  return (
    <>
      <div className="relative w-full animate-pulse">
        <div>
          <div className="p-3 aspect-[3/4] object-contain w-full bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="mt-2 bg-gray-200 h-6 rounded"></div>
          <div className="mt-1 bg-gray-200 w-3/4 h-10 rounded"></div>
        </div>
      </div>
    </>
  );
};
