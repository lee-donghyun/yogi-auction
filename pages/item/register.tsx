import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Gallery from "../../components/Gallery";
import InlineLoading from "../../components/InlineLoading";
import Naviagtion from "../../components/Navigation";
import SEO from "../../components/SEO";
import { registerItem } from "../../services/api/firebase";
import useForm from "../../services/hooks/useForm";

const RegisterItem: NextPage = () => {
  const router = useRouter();
  const { data, onChange, onSubmit, isValid, isLoading } =
    useForm<Item.Register>(
      { images: [], name: "", description: "" },
      (data) =>
        registerItem(data)
          .then((item) => router.push(`/item/${item.id}`))
          .catch(() => {
            alert("다시 시도해주세요.");
          }),
      (data) => !!(data.images.length && data.name && data.description)
    );

  console.log(data);

  return (
    <>
      <SEO />
      <div className="min-h-screen">
        <div>
          <div className="p-5">
            <h1 className="text-xl">상품 등록</h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="p-5 pb-0">
              <div>
                <label htmlFor="name">상품명</label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  value={data.name}
                  onChange={onChange}
                  name="name"
                  type="text"
                  className="border rounded w-full p-2"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="p-5 pb-0">
              <div>
                <label htmlFor="description">상품 설명</label>
              </div>
              <div className="mt-2">
                <textarea
                  id="description"
                  value={data.description}
                  onChange={onChange}
                  name="description"
                  rows={6}
                  className="border rounded w-full p-2 resize-none"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="p-5 pb-0">
              <div>
                <label htmlFor="name">상품 이미지</label>
              </div>
              <div className="mt-2">
                <Gallery
                  imageUrls={data.images}
                  name="images"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="px-5 pt-14 pb-24">
              <Button
                mode="fill"
                theme={isValid ? undefined : "#ebebeb"}
                submit
              >
                <InlineLoading isLoading={isLoading} label="등록하기" />
              </Button>
            </div>
          </form>
        </div>
        <div className="fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]  bg-white border-t border-black">
          <Link href={`/menu`}>
            <a className="ml-5 h-full w-fit flex items-center">
              <span>{`< 메뉴`}</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterItem;
