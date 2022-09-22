import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const firstChannel = await prisma.channel.upsert({
    where: {
      url: "https://t.me/kunuzofficial",
    },

    update: {},
    create: {
      name: "Kun.uz | Расмий канал",
      isArchived: false,
      isBlogger: false,
      url: "https://t.me/kunuzofficial",
      avatar: "/channels/kunuz.jpeg",
      formats: {
        create: {
          name: "1/24",
        },
      },
      description:
        "Kun.uz сайтининг расмий Telegram каналиO'zbekcha 👉 @kunuzРусский 👉 @kunuzruТезкор 👉 @kunonlineСайт: kun.uzРеклама: +998 78 113 10 10",
    },
  });

  console.log({ firstChannel });
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })