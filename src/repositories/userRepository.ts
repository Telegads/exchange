import prisma from '../core/prisma';

export const userRepository = {
  getUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
};
