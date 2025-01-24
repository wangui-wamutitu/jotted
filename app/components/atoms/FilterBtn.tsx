import { FaFilter } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";

const FilterBtn = ({
  setShowTopics,
  showTopics,
}: {
  setShowTopics: React.Dispatch<React.SetStateAction<boolean>>;
  showTopics: boolean;
}) => {
  return (
    <button className={'w-[6%] flex align-end justify-end'} onClick={() => setShowTopics(!showTopics)}>
      {showTopics ? <FaFilterCircleXmark size={28}/> : <FaFilter  size={20}/>}
    </button>
  );
};

export default FilterBtn;
 