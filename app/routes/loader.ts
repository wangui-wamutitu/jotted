import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/.server/db";

export const loader: LoaderFunction = async () => {
  try {
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
      topics: topics || [],
      blogs: blogsWithTopicNames || [],
    };
  } catch (error) {
    console.error("Error loading data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
};
