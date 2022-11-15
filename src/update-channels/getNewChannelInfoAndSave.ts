import { Sentry } from "../core/sentry";
import { getNewChannelInfo } from "./helpers/getNewChannelInfo";
import { saveNewChannelInfo } from "./helpers/saveNewChannelInfo";

export const getNewChannelInfoAndSave = async (channelId: string) => {
  try {
    const { data: newChannelInfo } = await getNewChannelInfo(channelId);
    await saveNewChannelInfo(channelId, newChannelInfo);
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
  }
};
