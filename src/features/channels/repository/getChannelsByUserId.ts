import { prisma } from '../../../core/prisma';
import { CHANNEL_FIELDS } from '../constants';

export const getChannelsByUserId = (userId: string) => {
  return prisma.channel.findMany({
    where: {
      ownedChannels: {
        some: {
          ownerId: userId,
        },
      },
    },
    select: CHANNEL_FIELDS,
  });
};
