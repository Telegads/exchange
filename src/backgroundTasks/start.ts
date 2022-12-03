import cron from 'node-cron';

import { getChannelsFromDbAndUpdate } from './updateChannels/main';

const updateChannelsTask = cron.schedule('*/10 * * * *', () => {
  getChannelsFromDbAndUpdate();
});

updateChannelsTask.start();
