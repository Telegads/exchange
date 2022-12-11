import { sendNotification } from './sendNotification';

type NotifyAdminsArg = {
  text: string;
};

export const notifyAdmins = async ({ text }: NotifyAdminsArg) => {
  const admins = ['12'];

  for await (const admin of admins) {
    await sendNotification({ text, userTgId: admin });
  }
};
