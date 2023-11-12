/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongsToId_key" ON "Product"("id", "belongsToId");
