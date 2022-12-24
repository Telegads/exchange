import { prisma } from '../../../core/prisma';

type GetChannelsByIdArg = { id: string };

export const getChannelById = ({ id }: GetChannelsByIdArg) => {
  return prisma.channel.findMany({
    where: {
      id,
    },
    select: {
      ChannelOwner: {
        select: {
          owner: {
            select: {
              tgId: true,
            },
          },
        },
      },
    },
  });
};
