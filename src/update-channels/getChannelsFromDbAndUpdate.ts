import { Sentry } from "../core/sentry";
import { channelRepository } from "../repositories/channelRepository";
import { getNewChannelInfo } from "./helpers/getNewChannelInfo";
import { saveNewChannelInfo } from "./helpers/saveNewChannelInfo";

export const getChannelsFromDbAndUpdate = async () => {
  const channels = await channelRepository.getChannelsToUpdate();

  for await (const channel of channels) {
    try {
      const channelId = channel.url;

      const { data: newChannelInfo } = await getNewChannelInfo(channelId);
      await saveNewChannelInfo(channelId, newChannelInfo);
    } catch (error) {
      Sentry.captureException(error);
    }
  }
};
