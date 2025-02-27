import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import SearchFilter from "~/components/molecules/SearchFilter";
import Topics from "~/components/molecules/Topics";
import { useSearchStore } from "~/stores/searchStore";
import Blogs from "~/components/molecules/Blogs";
import { useLoaderData } from "@remix-run/react";
import { loader as routeLoader } from "./loader";
import Wrapper from "~/components/atoms/Wrapper";
import { useUserStore } from "~/stores/userDetailsStore";

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
  const { topics, blogs, username, role, userId } = useLoaderData<typeof routeLoader>();
  const [showTopics, setShowTopics] = useState(false);
  const searchText = useSearchStore((state) => state.searchText);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if(userId && role && username){
      const user = {
        username: username?.name, role, userId
      }
      setUser({...user})
    }else{
      setUser(null)
    }
  }, [username, role, userId])

  return (
    <Wrapper>
      <SearchFilter showTopics={showTopics} setShowTopics={setShowTopics} />
      {showTopics ? <Topics topics={topics} /> : null}
      <Blogs blogs={blogs} />
    </Wrapper>
  );
}
