import { DEFAULT_PAGE_SIZE_FOR_UPDATE } from "../constants";
import { captureException } from "../core/sentry";
import { backgroundTaskRepository } from "../repositories/backgroundTaskRepository";

import { getChannelsForUpdate } from "./helpers/getChannelsForUpdate";
import { getIdFromUrl } from "./helpers/getIdFromUrl";
import { getNewChannelInfo } from "./helpers/getNewChannelInfo";
import { saveNewChannelInfo } from "./helpers/saveNewChannelInfo";

const TASK_NAME = "updateChannels";

export const getChannelsFromDbAndUpdate = async (
  numberOfChannels = DEFAULT_PAGE_SIZE_FOR_UPDATE
) => {
  console.log(`task: ${TASK_NAME} start`);

  const task = await backgroundTaskRepository.getOrCreateTask(TASK_NAME);

  if (task.status === "STOPPED") {
    console.log(`task: ${TASK_NAME} is stopped`);
    return;
  }

  const channels = await getChannelsForUpdate(numberOfChannels);

  for await (const channel of channels) {
    try {
      const channelId = getIdFromUrl(channel.url);

      const { data: newChannelInfo } = await getNewChannelInfo(channelId);

      await saveNewChannelInfo(channel.url, newChannelInfo);
    } catch (error) {
      console.log(error);

      captureException(error);
    }
  }
  console.log(`task: ${TASK_NAME} end`);
};
