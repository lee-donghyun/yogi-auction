import { useRouter } from "next/router";
import { useAuth } from "../../services/hooks/useAuth";
import Naviagtion from "../Navigation";
import SEO from "../SEO";

type Props = {
  pages?: string[];
};
const Auth: React.FC<Props> = ({ children, pages }) => {
  const router = useRouter();
  const [isAuthorized] = useAuth();

  if (isAuthorized === false && pages?.includes(router.pathname)) {
    router.replace({
      pathname: "/auth/signin",
      query: {
        redirect: router.asPath,
        ...router.query,
      },
    });
  }
  if (!isAuthorized && pages?.includes(router.pathname)) {
    return (
      <div>
        <SEO />
        <div className="min-h-screen">
          <div className="px-5">
            <img
              src="/images/brand.png"
              alt=""
              className="w-28 mx-auto my-16"
            />
            <div className="animate-pulse ">
              <div>
                <div>
                  <div className="w-24 h-6 rounded bg-gray-100"></div>
                </div>
                <div className="mt-2">
                  <div className="h-[42px] rounded bg-gray-100"></div>
                </div>
              </div>
              <div className="mt-5">
                <div>
                  <div className="w-24 h-6 rounded bg-gray-100"></div>
                </div>
                <div className="mt-2">
                  <div className="h-[42px] rounded bg-gray-100"></div>
                </div>
              </div>
              <div className="mt-10 flex gap-x-4">
                <div className="rounded w-full h-[58px] border-2 border-gray-100"></div>
                <div className="rounded w-full h-[58px] bg-gray-100 border border-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
        <Naviagtion />
      </div>
    );
  }
  return <>{children}</>;
};

export default Auth;
