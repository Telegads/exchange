import { prisma } from '../../../core/prisma';

export const getAllChannels = () => {
  return prisma.channel.findMany();
};
