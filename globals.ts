import { Blog } from "@prisma/client";

export interface IBlog extends Blog {
  topicName: string;
}

export type TComment = {
  id: number;
  blogId: number;
  comment: string;
  likes: number;
  userId: number;
  parentId: number | null;
  user?: { name: string };
  replies?: TComment[]; // Recursive replies
  createdAt: Date, 
  updatedAt: Date
};

export const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type Role = keyof typeof Roles;