import { DEFAULT_PAGE_SIZE_FOR_UPDATE } from '../../constants';
import { captureException } from '../../core/sentry';
import { archiveChannel } from '../../features/channels/repository';
import { backgroundTaskRepository } from '../../repositories/backgroundTaskRepository';
import { getIdFromUrl } from '../../features/channels/services/helpers/getIdFromUrl';
import { getNewChannelInfo } from '../../features/channels/services/getNewChannelInfo';
import { notifyAdmins } from '../../features/tg_notifications/services/notifyAdmins';

import { getChannelsForUpdate } from './getChannelsForUpdate';
import { saveNewChannelInfo } from './saveNewChannelInfo';

const TASK_NAME = 'updateChannels';

export const getChannelsFromDbAndUpdate = async (numberOfChannels = DEFAULT_PAGE_SIZE_FOR_UPDATE) => {
  const task = await backgroundTaskRepository.getOrCreateTask(TASK_NAME);

  if (task.status === 'STOPPED') {
    console.log(`task: ${TASK_NAME} is stopped`);
    return;
  }

  const channels = await getChannelsForUpdate(numberOfChannels);

  console.log(`task: ${TASK_NAME} start`);

  for await (const channel of channels) {
    try {
      const channelId = getIdFromUrl(channel.url);

      const { data: response } = await getNewChannelInfo(channelId);

      if (response.status === 'success') {
        return await saveNewChannelInfo({ oldChannelInfo: channel, newChannelInfo: response.data });
      }

      if (response.data === 'Channel not found') {
        return await archiveChannel(channelId);
      }
      if (response.data === 'No accounts left') {
        await notifyAdmins({ text: 'No sessions left in tg connector' });
        return await backgroundTaskRepository.stopTaskByName(TASK_NAME);
      }
    } catch (error) {
      console.log(error);

      captureException(error);
    }
  }
  console.log(`task: ${TASK_NAME} end`);
  return;
};
