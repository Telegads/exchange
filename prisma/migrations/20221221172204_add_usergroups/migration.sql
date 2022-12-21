/*
  Warnings:

  - You are about to drop the column `user_id` on the `UserGroup` table. All the data in the column will be lost.
  - The `name` column on the `UserGroup` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[systemName]` on the table `UserGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserGroup" DROP CONSTRAINT "UserGroup_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userGroupSystemName" TEXT NOT NULL DEFAULT 'USERS';

-- AlterTable
ALTER TABLE "UserGroup" DROP COLUMN "user_id",
ADD COLUMN     "systemName" TEXT NOT NULL DEFAULT 'USERS',
DROP COLUMN "name",
ADD COLUMN     "name" TEXT;

-- DropEnum
DROP TYPE "UserGroupName";

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_systemName_key" ON "UserGroup"("systemName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userGroupSystemName_fkey" FOREIGN KEY ("userGroupSystemName") REFERENCES "UserGroup"("systemName") ON DELETE RESTRICT ON UPDATE CASCADE;
