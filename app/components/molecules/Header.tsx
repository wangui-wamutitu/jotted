import Logo from "../atoms/Logo";
import Mode from "../atoms/Mode";

export const Header = () => {
  return (
    <header
      className={
        "flex justify-between items-center pb-[1rem] border-b border-b-dark_pink"
      }
    >
      <Logo />
      <Mode />
    </header>
  );
};
