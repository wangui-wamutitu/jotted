import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { useThemeStore } from "~/stores/themeStore";

const Mode = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <BsFillMoonStarsFill className={'w-6 h-6'}/> : <MdSunny className={'w-6 h-6'}/>}
    </button>
  );
};

export default Mode;