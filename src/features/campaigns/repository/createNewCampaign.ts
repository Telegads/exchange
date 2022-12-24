import prisma from '../../../core/prisma';

export type CreateNewCampaignArgs = {
  channels: { id: string }[];
  userId: string;
};

export const createNewCampaign = ({ channels, userId }: CreateNewCampaignArgs) => {
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
};
