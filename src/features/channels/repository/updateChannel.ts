import { Channel } from '@prisma/client';

import { prisma } from '../../../core/prisma';

export const updateChannel = (channel: Partial<Channel>) => {
  return prisma.channel.update({
    where: {
      url: channel.url,
    },
    data: channel,
  });
};
