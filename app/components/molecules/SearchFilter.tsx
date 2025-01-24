import Search from "../atoms/Search";
import FilterBtn from "../atoms/FilterBtn";

const SearchFilter = ({
  setShowTopics,
  showTopics,
}: {
  setShowTopics: React.Dispatch<React.SetStateAction<boolean>>;
  showTopics: boolean;
}) => {
  return (
    <section className={"w-full flex justify-between items-center py-[1rem]"}>
      <Search />
      <FilterBtn showTopics={showTopics} setShowTopics={setShowTopics} />
    </section>
  );
};

export default SearchFilter;
