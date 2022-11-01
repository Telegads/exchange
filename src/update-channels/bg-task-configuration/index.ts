import cron from "node-cron";
import { getChannelsFromDbAndUpdate } from "../getChannelsFromDbAndUpdate";

cron.schedule("1 * * * *", () => {
  getChannelsFromDbAndUpdate();
});
