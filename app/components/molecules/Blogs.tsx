import Blog from "../atoms/Blog";
import { IBlog } from "globals";

const Blogs = ({blogs}: {blogs: IBlog[]}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
