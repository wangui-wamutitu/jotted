import { useNavigate } from "@remix-run/react";
import { IBlog } from "globals";

const BlogSection = ({ blog }: { blog: IBlog }) => {
  const navigate = useNavigate();
  async function handleViewBlog(id: number) {
    navigate(`/blogs/${id}`)
  }
  return (
    <section key={blog?.id}>
      <div className={"w-full flex justify-between items-end my-10"}>
        <button onClick={() => handleViewBlog(blog?.id)} className="font-bold text-xl text-start hover:underline">{blog?.title}</button>
        <p className="font-extralight text-xs">
          {blog?.createdAt.toLocaleDateString()}
        </p>
      </div>
      <p>{blog?.excerpt}</p>

      <p className={"my-4 px-2 py-1 border border-dark_pink text-center"}>
        {blog?.topicName}
      </p>
    </section>
  );
};

export default BlogSection;
