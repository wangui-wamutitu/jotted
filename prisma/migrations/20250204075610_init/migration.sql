/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blog_content_key" ON "Blog"("content");
