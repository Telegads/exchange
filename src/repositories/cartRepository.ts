import prisma from '../core/prisma';
import { CHANNEL_FIELDS } from '../features/channels/constants';

export type UpdateCartArg = { userId: string; channelIds: { id: string }[] };

export const cartRepository = {
  getCart(userId: string) {
    return prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          select: CHANNEL_FIELDS,
        },
      },
    });
  },
  updateCart({ channelIds, userId }: UpdateCartArg) {
    return prisma.cart.upsert({
      where: { userId: userId },
      create: {
        cartItems: {
          connect: channelIds,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        cartItems: {
          set: channelIds,
        },
      },
    });
  },
};
