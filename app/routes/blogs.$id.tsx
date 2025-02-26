import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import Wrapper from "~/components/atoms/Wrapper";
import { CiClock2, CiUser } from "react-icons/ci";
import Likes from "~/components/atoms/Likes";
import Comments from "~/components/molecules/Comments";
import { getUserSession } from "~/common/session.server";
import { useUserStore } from "~/stores/userDetailsStore";

type ActionErrors = {
  name?: string;
  email?: string;
  comment?: string;
  formError?: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  // Validate blog ID
  const blogId = Number(params.id);
  if (isNaN(blogId)) {
    return {
      errors: {
        formError: "Invalid blog ID",
      },
    };
  }

  switch (actionType) {
    case "addComment": {
      const name = formData.get("name");
      const email = formData.get("email");
      const commentContent = formData.get("content");
      const parentId = formData.get("parentId");

      const errors: ActionErrors = {};

      // Validate inputs
      if (!name || typeof name !== "string" || name.trim() === "") {
        errors.name = "Name is required";
      }

      if (!email || typeof email !== "string" || !email.includes("@")) {
        errors.email = "Valid email is required";
      }

      if (
        !commentContent ||
        typeof commentContent !== "string" ||
        commentContent.trim() === ""
      ) {
        errors.comment = "Comment content is required";
      }

      // Return errors if validation fails
      if (Object.keys(errors).length > 0) {
        return { errors };
      }

      try {
        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: email as string },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: name as string,
              email: email as string,
            },
          });
        }

        // Create comment
        const commentData: any = {
          comment: (commentContent as string).trim(),
          blogId: blogId,
          userId: user.id,
          parentId: parentId ? parentId : null,
        };

        // Add parent comment if it exists and is valid
        if (parentId && !isNaN(Number(parentId))) {
          commentData.parentId = Number(parentId);
        }

        const newComment = await prisma.comment.create({
          data: commentData,
          include: {
            user: true,
            parent: true,
          },
        });

        return {
          success: true,
          comment: newComment,
        };
      } catch (error) {
        console.error("Comment creation error:", error);
        return {
          errors: {
            formError: "Failed to create comment. Please try again.",
          },
        };
      }
    }

    default:
      return {
        errors: {
          formError: "Invalid action",
        },
      };
  }
};

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

    return { blog, comments };
  } catch (error) {
    throw new Response(`Error in fetching this blog of id: ${params.id}`, {
      status: 500,
    });
  }
};

export default function Blog() {
  const { blog, comments } = useLoaderData<typeof loader>();
  const username = useUserStore((state) => state.username);

  return (
    <>
      <Wrapper username={username ?? ""}>
        <p className={"font-bold text-lg mb-3"}>{blog?.title}</p>
        <div className={"flex"}>
          <CiClock2 size={16} />
          <p className="font-extralight text-sm mb-3 ml-2 text-center">
            {blog?.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className={"flex"}>
          <CiUser size={16} />
          <p className="font-extralight text-sm mb-3 ml-2 text-center">
            Christine Wangui
          </p>
        </div>
        {/* ToDo: display image thumbnail from backend */}
        <img
          src={"/defaultThumbnail.jpg"}
          alt="Thumbnail"
          className={"mb-3 w-full h-48 rounded-[16px] object-contain"}
        />
        <p>{blog?.content}</p>
        <section className={"w-full my-3"}>
          <Likes likes={blog?.likes} />
          <p className={"font-bold text-lg"}>
            Let me hear from you{" "}
            {username ? null : (
              <Link to="/login" className={"ml-2 text-sm italic text-dark_pink hover:border-b hover:border-b-dark_pink"}>
                (Login to comment{" "})
              </Link>
            )}
          </p>
          <Comments comments={comments} />
        </section>
      </Wrapper>
    </>
  );
}
