import prisma from '../../../core/prisma';

export const countAllUsers = () => {
  return prisma.user.aggregate({
    _count: {
      id: true,
    },
  });
};
