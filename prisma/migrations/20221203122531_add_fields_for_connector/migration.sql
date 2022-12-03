-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "lastUpdateFromTelegram" TIMESTAMP(3),
ADD COLUMN     "postsLast30days" INTEGER,
ADD COLUMN     "viewsLast30days" INTEGER;
