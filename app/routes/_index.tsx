import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Header } from "~/components/molecules/Header";
import SearchFilter from "~/components/molecules/SearchFilter";
import { useSearchStore } from "~/stores/searchStore";

export const meta: MetaFunction = () => {
  return [
    { title: "Jotted by Christine" },
    { name: "description", content: "A blog site made by Christine called Jotted" },
  ];
};

export default function Index() {
  const [showTopics, setShowTopics] = useState(false)
  const searchText = useSearchStore(state => state.searchText)

  return (
    <div className="w-full h-screen px-[1rem] py-[1rem] md:px-[3rem]">
      <Header/>
      <SearchFilter showTopics={showTopics} setShowTopics={setShowTopics}/>
      {showTopics ? `I am topics for: ${searchText}` : 'No topics'}
    </div>
  );
}