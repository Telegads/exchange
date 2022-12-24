import { getChannelById } from '../../channels/repository/getByIds';

import { sendNotification } from './sendNotification';

export type NotifyChannelOwnerArgs = {
  channels: { id: string }[];
};

export const notifyChannelOwner = async ({ channels }: NotifyChannelOwnerArgs) => {
  const ownersToNotify = new Set<string>();

  for await (const channel of channels) {
    const [channelInfo] = await getChannelById(channel);

    const owners = channelInfo.ChannelOwner.map((owner) => owner.owner.tgId);

    owners.forEach((owner) => {
      if (owner !== null) {
        ownersToNotify.add(owner);
      }
    });
  }

  for await (const owner of ownersToNotify) {
    await sendNotification({ text: 'New campaign in your channel', userTgId: owner });
  }
};
