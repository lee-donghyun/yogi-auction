import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import Button from "../components/Button";
import InlineLoading from "../components/InlineLoading";
import Naviagtion from "../components/Navigation";
import SEO from "../components/SEO";
import { getUser, updateUser } from "../services/api/firebase";
import useForm from "../services/hooks/useForm";

const User: NextPage = () => {
  const { data: user, mutate } = useSWR("/myinfo", getUser);

  const { data, onChange, onSubmit, isLoading, setData } = useForm(
    { address: user?.address ?? "", bankAccount: user?.bankAccount ?? "" },
    async (data) => {
      try {
        await updateUser(data);
        await mutate();
      } catch (error) {
        alert("다시 시도해주세요.");
      }
    }
  );

  useEffect(() => {
    setData({
      address: user?.address ?? data.address,
      bankAccount: user?.bankAccount ?? data.bankAccount,
    });
  }, [user?.address, user?.bankAccount]);

  return (
    <div>
      <SEO />
      <div className="min-h-screen">
        <div className="p-5">
          <h1 className="text-xl">내 정보 수정</h1>
        </div>
        <div className="p-5">
          <form onSubmit={onSubmit} autoComplete="off" noValidate>
            <div>
              <div>
                <label htmlFor="address">배송 주소</label>
              </div>
              <div className="mt-2">
                {!user?.address && (
                  <div className="h-[42px] rounded bg-gray-100"></div>
                )}
                {!!user?.address && (
                  <input
                    id="address"
                    type="text"
                    name="address"
                    onChange={onChange}
                    value={data.address}
                    className="border rounded w-full p-2"
                  />
                )}
              </div>
            </div>
            <div className="mt-5">
              <div>
                <label htmlFor="bankAccount">정산 계좌</label>
              </div>
              <div className="mt-2">
                {!user?.bankAccount && (
                  <div className="h-[42px] rounded bg-gray-100"></div>
                )}
                {!!user?.bankAccount && (
                  <input
                    id="bankAccount"
                    type="text"
                    name="bankAccount"
                    onChange={onChange}
                    value={data.bankAccount}
                    className="border rounded w-full p-2"
                  />
                )}
              </div>
            </div>
            <div className="mt-10">
              <Button mode="fill" submit>
                <InlineLoading isLoading={isLoading} label="수정" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed inset-0 top-auto h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]  bg-white border-t border-black">
        <Link href={`/menu`}>
          <a className="ml-5 h-full w-fit flex items-center">
            <span>{`< 메뉴`}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default User;
