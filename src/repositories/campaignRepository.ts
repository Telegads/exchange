import { CampaignStatus } from '@prisma/client';

import prisma from '../core/prisma';

import { CHANNEL_FIELDS } from './channelRepository';

type CreateNewCampaignArgs = {
  channels: { id: string }[];
  userId: string;
};

export type UpdateCampaignArgs = {
  id: string;
  status: CampaignStatus;
  postImage?: string;
  postText: string;
  channels: { id: string }[];
};

export const campaignRepository = {
  countAllCampaigns() {
    return prisma.campaign.aggregate({
      _count: {
        id: true,
      },
    });
  },
  createNewCampaign({ channels, userId }: CreateNewCampaignArgs) {
    console.log('createNewCampaign', userId);

    return prisma.$transaction([
      prisma.campaign.create({
        data: {
          channels: {
            connect: channels,
          },
          userId: userId,
        },
      }),
      prisma.cart.update({
        where: {
          userId: userId,
        },
        data: {
          cartItems: {
            set: [],
          },
        },
      }),
    ]);
  },
  getCampaignById(id: string) {
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
  },
  updateCampaign({ id, status, postText, postImage, channels }: UpdateCampaignArgs) {
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
  },
  getAllCampaignsByUser(userId: string) {
    return prisma.campaign.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        status: true,
      },
    });
  },
};
