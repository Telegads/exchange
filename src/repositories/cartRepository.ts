import prisma from '../core/prisma';

export type UpdateCartArg = { userId: string; channelIds: { id: string }[] };

export const cartRepository = {
  getCart(userId: string) {
    return prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
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
