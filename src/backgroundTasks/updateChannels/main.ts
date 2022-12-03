import { DEFAULT_PAGE_SIZE_FOR_UPDATE } from '../../constants';
import { captureException } from '../../core/sentry';
import { backgroundTaskRepository } from '../../repositories/backgroundTaskRepository';
import { channelRepository } from '../../repositories/channelRepository';

import { getChannelsForUpdate } from './getChannelsForUpdate';
import { getIdFromUrl } from './getIdFromUrl';
import { getNewChannelInfo } from './getNewChannelInfo';
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
        return await channelRepository.archiveChannel(channelId);
      }
      if (response.data === 'No accounts left') {
        // TODO: notify admin
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
