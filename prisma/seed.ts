import path from 'path';

import csv from 'csvtojson';

import prisma from '../src/core/prisma';
import { USER_GROUP_SYSTEM_NAMES } from '../src/core/constants';

const getNumberOrUndefined = (value: string | undefined | null) => {
  try {
    return value ? Number(value) : undefined;
  } catch (error) {
    return undefined;
  }
};

async function main() {
  const categoriesFilePath = path.resolve(__dirname, './seed_data/Categories.csv');
  const channelsFilePath = path.resolve(__dirname, './seed_data/Channels.csv');

  const categories = await csv().fromFile(categoriesFilePath);

  for await (const { id, name } of categories) {
    await prisma.category.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
      },
    });
  }

  const channels = await csv().fromFile(channelsFilePath);

  for await (const channel of channels) {
    await prisma.channel.upsert({
      where: {
        url: channel.url,
      },
      update: {},
      create: {
        isArchived: channel.isArchived === 'FALSE',
        isBlogger: channel.isBlogger === 'FALSE',
        name: channel.name,
        url: channel.url,
        avatar: channel.avatar,
        category: {
          connect: {
            id: channel.categoryId,
          },
        },
        cpv: getNumberOrUndefined(channel.cpv),
        description: channel.description,
        er: getNumberOrUndefined(channel.er),
        malePercent: getNumberOrUndefined(channel.malePercent),
        postPrice: getNumberOrUndefined(channel.postPrice),
        subscribers: getNumberOrUndefined(channel.subscribers),
        views: getNumberOrUndefined(channel.views),
      },
    });
  }

  console.log(`Update ${categories.length} categories and ${channels.length} channels`);

  await prisma.userGroup.upsert({
    where: {
      systemName: USER_GROUP_SYSTEM_NAMES.users,
    },
    create: {
      systemName: USER_GROUP_SYSTEM_NAMES.users,
      name: 'Users',
    },
    update: {},
  });
  await prisma.userGroup.upsert({
    where: {
      systemName: USER_GROUP_SYSTEM_NAMES.admins,
    },
    create: {
      systemName: USER_GROUP_SYSTEM_NAMES.admins,
      name: 'Admins',
    },
    update: {},
  });

  await prisma.user.upsert({
    where: { id: 'basicUser' },
    create: {
      id: 'basicUser',
      name: 'Basic User',
      tgId: 'basicUser',
      TgBotAuthToken: {
        create: {
          token: 'testToken',
          validTillDateTimeUTC: new Date(Date.parse('2028')),
        },
      },
    },
    update: {},
  });
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
