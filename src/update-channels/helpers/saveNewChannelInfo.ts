import { channelRepository } from '../../repositories/channelRepository';

import { ChannelInfoResponse } from './getNewChannelInfo';

export const saveNewChannelInfo = async (channelId: string, newChannelInfo: ChannelInfoResponse) =>
  channelRepository.updateChannel({
    name: newChannelInfo.name,
    subscribers: newChannelInfo.subs_count,
    views: newChannelInfo.views_last_30_days,
    url: channelId,
    description: newChannelInfo.description,
    avatar: newChannelInfo.avatar_path,
    er: Math.round(
      (newChannelInfo.views_last_30_days /
        newChannelInfo.posts_last_30_days /
        newChannelInfo.subs_count) *
        100
    ),
  });
