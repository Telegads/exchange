import prisma from '../core/prisma';

export const userRepository = {
  countAllUsers() {
    return prisma.user.aggregate({
      _count: {
        id: true,
      },
    });
  },
};
