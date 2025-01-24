import {create} from "zustand";

interface SearchStore {
  searchText: string
  setSearchText: (searchText: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    searchText: '',
    setSearchText: (text:string) => set((state) => ({ searchText: text })),
}));
