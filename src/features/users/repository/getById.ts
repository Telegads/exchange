import prisma from '../../../core/prisma';

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
