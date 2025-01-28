import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Header } from "~/components/molecules/Header";
import SearchFilter from "~/components/molecules/SearchFilter";
import Topics from "~/components/molecules/Topics";
import { useSearchStore } from "~/stores/searchStore";
import Blogs from "~/components/molecules/Blogs";
import { useLoaderData } from "@remix-run/react";
import { loader as routeLoader } from "./loader";

// When you put the loader in a separate loader.ts file, Remix does not automatically recognize it as the loader for _index.tsx. Loaders are tied to specific routes, and Remix expects the loader to either:

// Be directly defined in the same file as the corresponding route component (_index.tsx), or
// Be explicitly exported from another file (e.g., loader.ts) and imported where needed.

// To correctly use the loader from loader.ts, explicitly import and re-export it in _index.tsx as below
export { routeLoader as loader };

export const meta: MetaFunction = () => {
  return [
    { title: "Jotted by Christine" },
    {
      name: "description",
      content: "A blog site made by Christine called Jotted",
    },
  ];
};

export default function Index() {
  const [showTopics, setShowTopics] = useState(false);
  const searchText = useSearchStore((state) => state.searchText);
  const { topics, blogs } = useLoaderData<typeof routeLoader>();

  return (
    <div className="w-full min-h-screen mt-[3rem] flex flex-col items-center justify-center ">
      <div className={"w-full lg:w-[70%] xl:w-[40%] 2xl:w-[25%] px-[1rem] py-[1rem] md:px-[3rem]"}>
        <Header />
        <SearchFilter showTopics={showTopics} setShowTopics={setShowTopics} />
        {showTopics ? <Topics topics={topics} /> : null}
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
}
