import { DEFAULT_PAGE_SIZE_FOR_UPDATE } from "../constants";
import { Sentry } from "../core/sentry";

import { getChannelsForUpdate } from "./helpers/getChannelsForUpdate";
import { getIdFromUrl } from "./helpers/getIdFromUrl";
import { getNewChannelInfo } from "./helpers/getNewChannelInfo";
import { saveNewChannelInfo } from "./helpers/saveNewChannelInfo";

export const getChannelsFromDbAndUpdate = async (
  numberOfChannels = DEFAULT_PAGE_SIZE_FOR_UPDATE
) => {
  console.log("start getChannelsFromDbAndUpdate");

  const channels = await getChannelsForUpdate(numberOfChannels);

  for await (const channel of channels) {
    try {
      const channelId = getIdFromUrl(channel.url);

      const { data: newChannelInfo } = await getNewChannelInfo(channelId);

      await saveNewChannelInfo(channel.url, newChannelInfo);
    } catch (error) {
      console.log(error);

      Sentry.captureException(error);
    }
  }
  console.log("end getChannelsFromDbAndUpdate");
};
