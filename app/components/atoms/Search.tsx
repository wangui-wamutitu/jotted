import { useSearchStore } from "~/stores/searchStore";

const Search = () => {
  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);
  return (
    <input
      type="text"
      className={"w-[90%] px-2 py-3 text-sm border border-dark_pink rounded-md bg-transparent"}
      placeholder="Search..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default Search;
