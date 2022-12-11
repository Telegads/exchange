import { NotificationStatus } from '@prisma/client';

import prisma from '../../../core/prisma';

type SaveNotificationArg = {
  status: NotificationStatus;
  text: string;
  userTgId: string;
};

export function saveNotification({ status, text, userTgId }: SaveNotificationArg) {
  return prisma.notification.create({
    data: {
      status,
      text,
      userTgId,
    },
  });
}
