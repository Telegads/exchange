import { NewChannelInfo } from '../getNewChannelInfo';

type MapNewChannelInfoToModelArgs = {
  newChannelInfo: NewChannelInfo;
};

export const mapNewChannelInfoToModel = ({ newChannelInfo }: MapNewChannelInfoToModelArgs) => {
  const {
    views_last_30_days: viewsLast30days,
    posts_last_30_days: postsLast30days,
    subs_count: subscribers,
    avatar_path: avatar,
    description,
    name,
  } = newChannelInfo;

  const er =
    viewsLast30days && postsLast30days && subscribers
      ? Math.round((viewsLast30days / postsLast30days / subscribers) * 100)
      : 0;

  return {
    name,
    subscribers,
    views: viewsLast30days,
    description,
    avatar,
    er,
    viewsLast30days,
    postsLast30days,
  };
};
