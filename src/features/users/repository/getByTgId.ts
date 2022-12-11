import prisma from '../../../core/prisma';

type GetUserByTgIdArg = {
  tgId: string;
};

export function getUserByTgId({ tgId }: GetUserByTgIdArg) {
  return prisma.user.findMany({
    where: {
      tgId,
    },
    select: {
      id: true,
      name: true,
    },
  });
}
