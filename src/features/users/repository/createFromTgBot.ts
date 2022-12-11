import prisma from '../../../core/prisma';

type CreateFromTgBotArg = {
  tgId: string;
  name: string;
};

export const createFromTgBot = async ({ tgId, name }: CreateFromTgBotArg) => {
  return prisma.user.create({
    data: {
      tgId,
      name,
    },
  });
};
