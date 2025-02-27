import { create } from "zustand";

interface UserState {
  user: {
    username: string | null;
    userId: number | null;
    role: "USER" | "WRITER";
  } | null;
  setUser: (user: UserState["user"]) => void;
  resetUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
