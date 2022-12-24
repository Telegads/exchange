import { getAdminsTgIds } from '../../users/services/getAdmins';

import { sendNotification } from './sendNotification';

type NotifyAdminsArg = {
  text: string;
};

export const notifyAdmins = async ({ text }: NotifyAdminsArg) => {
  const admins = await getAdminsTgIds();

  for await (const adminTgId of admins) {
    if (adminTgId) await sendNotification({ text, userTgId: adminTgId });
  }
};
