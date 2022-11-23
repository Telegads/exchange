import axios from 'axios';

export type ChannelInfoResponse = {
  description: string;
  name: string;
  subs_count: number;
  views_last_30_days: number;
  posts_last_30_days: number;
  views_last_day: number;
  avatar_path: string;
};

export const getNewChannelInfo = (channelId: string) =>
  axios.get<ChannelInfoResponse>(`https://tg-connector.telegads.uz/get_info/${channelId}`);
