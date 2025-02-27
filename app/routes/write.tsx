import { Link } from "@remix-run/react";
import Wrapper from "~/components/atoms/Wrapper";
import WriteBlogSection from "~/components/organism/WriteBlogSection";
import { useUserStore } from "~/stores/userDetailsStore";

const Write = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Wrapper>
      {user ? (
        user?.role === "WRITER" ? (
            <div className={'w-full h-[75vh] flex justify-start items-start'}> 
                <WriteBlogSection />
            </div>
        ) : (
          <div
            className={
              "w-full h-full flex flex-col justify-center items-center"
            }
          >
            <p>Unauthorized</p>
            <Link
              to="/"
              className={
                "ml-2 text-sm italic hover:border-b hover:border-b-dark_pink"
              }
            >
              You are not a writer. Sign up as a writer to access this page
            </Link>
          </div>
        )
      ) : (
        <div
          className={"w-full h-full flex flex-col justify-center items-center"}
        >
          <p>Unauthorized</p>
          <Link
            to="/login"
            className={
              "ml-2 text-sm italic hover:border-b hover:border-b-dark_pink"
            }
          >
            Login first to view page
          </Link>
        </div>
      )}
    </Wrapper>
  );
};

export default Write;
