import prisma from '../../../core/prisma';

export function getByTgAuthToken(token: string) {
  console.log(token);

  return prisma.user.findMany({
    where: {
      TgBotAuthToken: {
        some: {
          token,
        },
      },
    },
  });
}