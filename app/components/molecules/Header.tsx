import Logo from "../atoms/Logo";
import Mode from "../atoms/Mode";

export const Header = () => {
  return (
    <header
      className={
        "w-full flex justify-between items-center pb-[2rem]"
      }
    >
      <Logo />
      <Mode />
    </header>
  );
};
