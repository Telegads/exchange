import { Channel } from '@prisma/client';

import { channelRepository } from '../../repositories/channelRepository';

import { NewChannelInfo } from './getNewChannelInfo';

type SaveNewChannelInfoArg = {
  oldChannelInfo: Channel;
  newChannelInfo: NewChannelInfo;
};

export const saveNewChannelInfo = async ({ newChannelInfo, oldChannelInfo }: SaveNewChannelInfoArg) => {
  const {
    views_last_30_days: viewsLast30days,
    posts_last_30_days: postsLast30days,
    subs_count: subscribers,
    avatar_path: avatar,
    description,
    name,
  } = newChannelInfo;

  const { url } = oldChannelInfo;

  const er =
    viewsLast30days && postsLast30days && subscribers
      ? Math.round((viewsLast30days / postsLast30days / subscribers) * 100)
      : 0;

  return channelRepository.updateChannel({
    name,
    subscribers,
    views: viewsLast30days,
    url,
    description,
    avatar,
    er,
    viewsLast30days,
    postsLast30days,
    lastUpdateFromTelegram: new Date(Date.now()),
  });
};
