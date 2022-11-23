import prisma from '../core/prisma';

export const categoryRepository = {
  getAllCategories() {
    return prisma.category.findMany({});
  },
};
