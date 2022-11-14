import axios from "axios";

const TG_CONNECTOR_URL = process.env["TG_CONNECTOR_URL"];

export type ChannelInfoResponse = {
  description: string;
  name: string;
  subs_count: number;
  views_last_30_days: number;
  posts_last_30_days: number;
  views_last_day: number;
};

export const getNewChannelInfo = (channelId: string) =>
  axios.get<ChannelInfoResponse>(
    `http://${TG_CONNECTOR_URL}/get_info/${channelId}`
  );
