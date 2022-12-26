import { DateTime } from 'luxon';

import prisma from '../../../core/prisma';

type CreateTempTokenForTgBotArg = {
  userTgId: string;
};

export const createTempTokenForTgBot = ({ userTgId }: CreateTempTokenForTgBotArg) => {
  const token = Math.random().toString(36).slice(2, 7);
  const validTillDateTimeUTC = DateTime.utc().plus({ minutes: 5 }).toJSDate();

  return prisma.tgBotAuthToken.create({
    data: {
      token,
      userTgId,
      validTillDateTimeUTC,
    },
  });
};
