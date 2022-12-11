import axios from 'axios';

import { captureException } from '../../../core/sentry';
import { TG_BOT_API_URL } from '../constants';
import { saveNotification } from '../repository';

type Notification = {
  userTgId: string;
  text: string;
};

export const sendNotification = async (notification: Notification) => {
  try {
    await axios.post<any, any, Notification>(TG_BOT_API_URL, notification);
    await saveNotification({ ...notification, status: 'SENT' });
    return { status: 'SENT' };
  } catch (error) {
    captureException(error);
    saveNotification({ ...notification, status: 'SENT' });
    return { status: 'ERROR' };
  }
};
