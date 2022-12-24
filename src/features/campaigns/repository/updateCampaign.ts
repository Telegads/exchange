import { CampaignStatus } from '@prisma/client';

import prisma from '../../../core/prisma';

export type UpdateCampaignArgs = {
  id: string;
  status: CampaignStatus;
  postImage?: string;
  postText: string;
  channels: { id: string }[];
};

export const updateCampaign = ({ id, status, postText, postImage, channels }: UpdateCampaignArgs) => {
  return prisma.campaign.update({
    where: {
      id,
    },
    data: {
      status,
      postImage,
      postText,
      channels: {
        set: channels,
      },
    },
  });
};
