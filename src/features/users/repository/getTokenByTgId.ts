import { DateTime } from 'luxon';

import prisma from '../../../core/prisma';

type GetTokenByTgId = {
  tgId: string;
};

export const getTokenByTgId = ({ tgId }: GetTokenByTgId) => {
  return prisma.tgBotAuthToken.findMany({
    where: {
      userTgId: tgId,
      validTillDateTimeUTC: {
        gte: DateTime.utc().toJSDate(),
      },
    },
  });
};
