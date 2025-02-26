import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/.server/db";
import { getSession, getUserSession } from "~/common/session.server";

export const loader: LoaderFunction = async ({request}) => {
  try {
    const session = await getUserSession(request);
    let userName = null;
    if (session?.userId) {
      userName = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { name: true },
      });
    }

    const topics = await prisma.topic.findMany();
    const blogs = await prisma.blog.findMany();

    const blogsWithTopicNames = await Promise.all(
      blogs.map(async (blog) => {
        const topic = await prisma.topic.findUnique({
          where: { id: blog.topicId },
        });
        return { ...blog, topicName: topic?.name || "Some tea" };
      })
    );

    return {
      userId: session.userId,
      role: session.role,
      username: userName,
      topics: topics || [],
      blogs: blogsWithTopicNames || [],
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};
