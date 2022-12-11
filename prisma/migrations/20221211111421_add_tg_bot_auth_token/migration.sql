-- CreateTable
CREATE TABLE "TgBotAuthToken" (
    "token" TEXT NOT NULL,
    "user_tg_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TgBotAuthToken_token_key" ON "TgBotAuthToken"("token");

-- AddForeignKey
ALTER TABLE "TgBotAuthToken" ADD CONSTRAINT "TgBotAuthToken_user_tg_id_fkey" FOREIGN KEY ("user_tg_id") REFERENCES "User"("tgId") ON DELETE RESTRICT ON UPDATE CASCADE;
