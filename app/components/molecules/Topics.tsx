import { Topic } from "@prisma/client";

const Topics = ({ topics }: { topics: Topic[] }) => {
  return (
    <div className={"w-full flex flex-col md:flex-row justify-center md:justify-between items-center"}>
      {topics?.length === 0 ? (
        <p>No topics</p>
      ) : (
        topics?.map((topic) => (
          <button
            key={topic?.id}
            className={
              "w-[180px] my-1 md:my-0 md:w-1/4 h-14 flex items-center justify-center border border-dark_pink hover:border-dark_purple rounded-lg px-3"
            }
          >
            {topic?.name}
          </button>
        ))
      )}
    </div>
  );
};

export default Topics;
