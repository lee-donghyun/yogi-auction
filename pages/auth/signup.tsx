import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../../components/Button";
import InlineLoading from "../../components/InlineLoading";
import Naviagtion from "../../components/Navigation";
import SEO from "../../components/SEO";
import { postEmailSignUp } from "../../services/api/identitytoolkit";
import { useAuth } from "../../services/hooks/useAuth";
import useForm from "../../services/hooks/useForm";
import useStorage from "../../services/hooks/useStorage";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const [isAuthorized, load] = useAuth();
  const [selector, dispatch] = useStorage<{ auth: Auth.data }>();
  const { data, onChange, onSubmit, isLoading } = useForm(
    { email: "", password: "", address: "", bankAccount: "" },
    (data) =>
      postEmailSignUp(data)
        .then((res) => {
          dispatch({ auth: res.data });
          return res.data.refreshToken;
        })
        .then(load)
        .catch((error) => {
          const { message } = error.response.data.error;
          switch (message) {
            case "INVALID_EMAIL":
              alert("유효하지 않은 이메일입니다.");
              break;
            case "MISSING_PASSWORD":
              alert("비밀번호를 입력해 주세요.");
              break;
            case "MISSING_EMAIL":
              alert("이메일을 입력해 주세요.");
              break;
            case "EMAIL_EXISTS":
              alert("이미 존재하는 이메일입니다.");
              break;
            case "OPERATION_NOT_ALLOWED":
              alert("이메일 회원가입은 더 이상 지원하지 않습니다.");
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              alert(
                "너무 많은 요청이 발생되었습니다. 잠시 후 다시 시도해 주세요."
              );
              break;
            case "WEAK_PASSWORD : Password should be at least 6 characters":
              alert("비밀번호는 6자리 이상이어야 합니다.");
              break;
            default:
              alert("다시 시도해 주세요.");
              break;
          }
        }),
    (data) =>
      !!(data.email && data.password && data.address && data.bankAccount)
  );

  useEffect(() => {
    if (isAuthorized) {
      router.replace(redirect ? redirect + "" : "/user");
    }
  }, [isAuthorized]);

  return (
    <div>
      <SEO />
      <div className="pb-36 min-h-screen max-w-lg mx-auto">
        <div className="px-5">
          <img
            src="/images/brand.png"
            alt=""
            className="w-28 h-28 mx-auto my-16"
          />
          <form onSubmit={onSubmit} autoComplete="off" noValidate>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={data.email}
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
            <div className="mt-5">
              <div>
                <label htmlFor="password">비밀번호</label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={data.password}
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
            <div className="mt-5">
              <div>
                <label htmlFor="address">배송 주소</label>
              </div>
              <div className="mt-2">
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={onChange}
                  value={data.address}
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
            <div className="mt-5">
              <div>
                <label htmlFor="bankAccount">정산 계좌</label>
              </div>
              <div className="mt-2">
                <input
                  id="bankAccount"
                  type="text"
                  name="bankAccount"
                  onChange={onChange}
                  value={data.bankAccount}
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
            <div className="mt-10 flex gap-x-4">
              <Button
                mode="outline"
                href={{ pathname: "/auth/signin", query: router.query }}
              >
                로그인
              </Button>
              <Button mode="fill" submit>
                <InlineLoading isLoading={isLoading} label="가입" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Naviagtion />
    </div>
  );
};

export default SignUp;
