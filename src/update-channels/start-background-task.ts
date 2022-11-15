import cron from "node-cron";
import { getChannelsFromDbAndUpdate } from "./getChannelsFromDbAndUpdate";

const task = cron.schedule("1 * * * *", () => {
  getChannelsFromDbAndUpdate();
});

task.start()