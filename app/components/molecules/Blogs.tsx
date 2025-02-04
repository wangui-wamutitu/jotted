import BlogSection from "../atoms/Blog";
import { IBlog } from "globals";

const Blogs = ({blogs}: {blogs: IBlog[]}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogSection blog={blog} key={blog?.id} />
      ))}
    </div>
  );
};

export default Blogs;
