import type { NextPage } from "next";
import { DebounceInput } from "react-debounce-input";
import Button from "../../components/Button";
import Naviagtion from "../../components/Navigation";
import SEO from "../../components/SEO";
import { postEmailSignUp } from "../../services/api/firebase";
import useForm from "../../services/hooks/useForm";

const SignIn: NextPage = () => {
  const { data, onChange, onSubmit } = useForm(
    { email: "", password: "" },
    async (data) => {
      try {
        await postEmailSignUp(data);
      } catch (error) {}
    }
  );

  return (
    <div>
      <SEO />
      <div className="min-h-screen">
        <div className="px-5">
          <img src="/images/brand.png" alt="" className="w-28 mx-auto my-16" />
          <form onSubmit={onSubmit} autoComplete="off" noValidate>
            <div>
              <div>
                <label htmlFor="email">이메일</label>
              </div>
              <div className="mt-2">
                <DebounceInput
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
                <label htmlFor="email">패스워드</label>
              </div>
              <div className="mt-2">
                <DebounceInput
                  id="password"
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={data.password}
                  className="border rounded w-full p-2"
                />
              </div>
            </div>
            <div className="mt-10 flex gap-x-4">
              <Button mode="outline" href="/auth/signin">
                로그인
              </Button>
              <Button mode="fill" submit>
                가입
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Naviagtion />
    </div>
  );
};

export default SignIn;
