import { channelRepository } from "../../repositories/channelRepository";

export const getChannelsForUpdate = (limit: number) =>
  channelRepository.getChannelsToUpdate(limit);
