import { PrismaClient } from "@prisma/client";
import csv from "csvtojson";
import path from "path";
const prisma = new PrismaClient();

const csvFilePath = "../seed_data/TelegAds-data-seed.csv";
const getNumberOrUndefined = (input: string|undefined) => {
  if (typeof input === undefined) {
    return input as undefined;
  }
  const number = Number(input);

  try {
    if (isNaN(number)) {
      return;
    }
    return number;
  } catch (error) {
    console.log(error);

    return;
  }
};

async function main() {
  console.log(path.resolve(__dirname, csvFilePath));

  // const channels = await csv().fromFile(path.resolve(__dirname, csvFilePath));

  // for await (const channel of channels) {
  //   // console.log(channel);
    
  //   await prisma.channel.upsert({
  //     where: {
  //       url: channel.url,
  //     },
  //     update: {},
  //     create: {
  //       isArchived: channel.isArchived === "FALSE",
  //       isBlogger: channel.isBlogger === "FALSE",
  //       name: channel.name,
  //       url: channel.url,
  //       avatar: channel.avatar,
  //       category: {
  //         connectOrCreate: {
  //           where: {
  //             id: channel.categoryId,
  //           },
  //           create: {
  //             name: channel.categories,
  //             id: channel.categoryId,
  //           },
  //         },
  //       },
  //       cpv: getNumberOrUndefined(channel.cpv),
  //       description: channel.description,
  //       er: getNumberOrUndefined(channel.er),
  //       malePercent: getNumberOrUndefined(channel.malePercent),
  //       postPrice: getNumberOrUndefined(channel.postPrice),
  //       subscribers: getNumberOrUndefined(channel.subscribers),
  //       views: getNumberOrUndefined(channel.views),
  //     },
  //   });
  // }

  // console.log("done ", channels.length);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
