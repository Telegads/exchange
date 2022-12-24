import { Channel } from '@prisma/client';

import { updateChannel } from '../../features/channels/repository';
import { NewChannelInfo } from '../../features/channels/services/getNewChannelInfo';
import { mapNewChannelInfoToModel } from '../../features/channels/services/helpers/mapNewChannelInfoToModel';

type SaveNewChannelInfoArg = {
  oldChannelInfo: Channel;
  newChannelInfo: NewChannelInfo;
};

export const saveNewChannelInfo = async ({ newChannelInfo, oldChannelInfo }: SaveNewChannelInfoArg) => {
  const newChannelModel = mapNewChannelInfoToModel({ newChannelInfo });

  const { url } = oldChannelInfo;

  return updateChannel({
    ...newChannelModel,
    url,
    lastUpdateFromTelegram: new Date(Date.now()),
  });
};
