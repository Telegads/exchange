import prisma from '../../../core/prisma';
import { CHANNEL_FIELDS } from '../../channels/constants';

export const getCampaignById = (id: string) => {
  return prisma.campaign.findUnique({
    where: {
      id,
    },
    select: {
      channels: {
        select: CHANNEL_FIELDS,
      },
      id: true,
      status: true,
      userId: true,
      postImage: true,
      postText: true,
    },
  });
};
