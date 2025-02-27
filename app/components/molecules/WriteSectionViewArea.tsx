import React from "react";
import YourBlogsSection from "./write-view-sections/YourBlogsSection";
import YourIdeasSection from "./write-view-sections/YourIdeasSection";
import DraftsSection from "./write-view-sections/DraftsSection";
import WriteSection from "./write-view-sections/WriteSection";

const WriteSectionViewArea = ({
  selectedItemId,
}: {
  selectedItemId: number | null;
}) => {

  return (
    <div className={"w-4/5 h-full ml-4 border border-dark_pink rounded-lg"}>
      {selectedItemId === 1 || selectedItemId === null ? (
        <YourBlogsSection />
      ) : null}

      {selectedItemId === 2 ? <YourIdeasSection /> : null}
      {selectedItemId === 3 ? <DraftsSection /> : null}

      {selectedItemId === 4 ? <WriteSection /> : null}
    </div>
  );
};

export default WriteSectionViewArea;
