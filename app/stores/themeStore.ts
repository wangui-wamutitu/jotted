import {create} from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light", // default theme
  toggleTheme: () =>
    set((state: { theme: Theme }) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return { theme: newTheme };
    }),
  // setTheme provides flexibility for programmatic control, such as:
  // Initializing the theme from saved data.
  // Allowing server-side theme changes.
  // Enabling themes other than just light or dark (e.g., a blue theme).
  setTheme: (theme: Theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));
