-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userGroupSystemName" TEXT NOT NULL DEFAULT 'USERS';

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "systemName" TEXT NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_systemName_key" ON "UserGroup"("systemName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userGroupSystemName_fkey" FOREIGN KEY ("userGroupSystemName") REFERENCES "UserGroup"("systemName") ON DELETE RESTRICT ON UPDATE CASCADE;
