/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_commentId_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "likes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentId" INTEGER,
ALTER COLUMN "likes" SET DEFAULT 0;

-- DropTable
DROP TABLE "Reply";

-- CreateIndex
CREATE INDEX "Blog_topicId_idx" ON "Blog"("topicId");

-- CreateIndex
CREATE INDEX "Blog_likes_idx" ON "Blog"("likes");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
