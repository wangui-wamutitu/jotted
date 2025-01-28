import { Blog } from "@prisma/client";

export interface IBlog extends Blog {
  topicName: string;
}
