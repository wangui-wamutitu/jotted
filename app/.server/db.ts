import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
  result: {
    user: {
      password: {
        compute() {
          return undefined; // Always remove password
        },
      },
    },
  },
});
