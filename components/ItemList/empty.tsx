import Button from "../Button";

const ItemListEmpty = ({}) => {
  return (
    <div className="px-5 pt-10 text-center">
      <p>찾는 물건이 없다면?</p>
      <div className="mt-5">
        <Button mode="fill" href={"/item/register"}>
          상품 등록하기
        </Button>
      </div>
    </div>
  );
};

export default ItemListEmpty;
