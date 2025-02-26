import Logo from "../atoms/Logo";
import Mode from "../atoms/Mode";
import UserProfile from "../atoms/UserProfile";

export const Header = ({username}: {username: string}) => {
  return (
    <header className={"w-full flex items-center justify-center"}>
      <div
        className={
          "w-full lg:w-[70%] xl:w-[55%] 2xl:w-[40%] px-[1rem] md:px-[3rem] py-[2rem] flex items-center justify-between"
        }
      >
        <Logo />
        <UserProfile username={username}/>
        <Mode />
      </div>
    </header>
  );
};
