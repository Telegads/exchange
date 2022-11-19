import cron from "node-cron";
import { getChannelsFromDbAndUpdate } from "./getChannelsFromDbAndUpdate";

const task = cron.schedule("*/10 * * * *", () => {
  getChannelsFromDbAndUpdate();
});

task.start()