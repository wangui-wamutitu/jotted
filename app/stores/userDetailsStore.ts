import {create} from "zustand";

interface UserStore {
  username: string | null
//   userId?: number
//   role?: 'USER' | 'WRITER'
  setUsername: (username: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    username: null,
    setUsername: (name:string | null) => set((state) => ({ username: name })),
}));
