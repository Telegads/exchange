import { prisma } from '../../../core/prisma';

export const getAllCategories = () => {
  return prisma.category.findMany({});
};
