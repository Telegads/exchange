import axios from 'axios';

export type NewChannelInfo = {
  description: string;
  name: string;
  subs_count: number;
  views_last_30_days: number;
  posts_last_30_days: number;
  views_last_day: number;
  avatar_path: string;
};

export type TgConnectorResponse =
  | {
      status: 'error';
      data: 'Channel not found' | 'No accounts left';
    }
  | {
      status: 'success';
      data: NewChannelInfo;
    };

export const getNewChannelInfo = (channelId: string) =>
  axios.get<TgConnectorResponse>(`https://tg-connector.telegads.uz/get_info/${channelId}`);
