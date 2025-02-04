import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import Wrapper from "~/components/atoms/Wrapper";
import defaultThumbnail from "../../public/defaultThumbnail.jpg";
import { CiClock2, CiUser } from "react-icons/ci";
import Likes from "~/components/atoms/Likes";
import Comments from "~/components/molecules/Comments";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(params.id) },
    });
    const comments = await prisma.comment.findMany({
      where: { blogId: Number(params.id), parentId: null }, // Get top-level comments
      include: {
        user: true, // Include user for top-level comments
        replies: {
          include: {
            user: true, // Include user for first-level replies
            replies: {
              include: {
                user: true, // Include user for second-level replies
              },
            },
          },
        },
      },
      orderBy: { id: "asc" },
    });
    

    return {blog, comments};
  } catch (error) {
    throw new Response(`Error in fetching this blog of id: ${params.id}`, {
      status: 500,
    });
  }
};

export default function Blog() {
  const {blog,comments} = useLoaderData<typeof loader>();
  console.log(comments);

  return (
    <>
      <Wrapper>
        <p className={"font-bold text-lg mb-3"}>{blog?.title}</p>
        <div className={"flex"}>
          <CiClock2 size={16} />
          <p className="font-extralight text-xs mb-3 ml-2 text-center">
            {blog?.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className={"flex"}>
          <CiUser size={16} />
          <p className="font-extralight text-xs mb-3 ml-2 text-center">
            Christine Wangui
          </p>
        </div>
        {/* ToDo: display image thumbnail from backend */}
        <img
          src={'/defaultThumbnail.jpg'}
          alt="Thumbnail"
          className={"mb-3 w-full h-48 rounded-[16px] object-contain"}
        />
        <p className={"text-sm"}>{blog?.content}</p>
        <section className={"w-full my-3"}>
          <p className={"font-bold"}>Let me hear from you</p>
          <Likes likes={blog?.likes} />
          <Comments comments={comments} />
        </section>
      </Wrapper>
    </>
  );
}
