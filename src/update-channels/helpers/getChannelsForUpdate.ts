import { channelRepository } from "../../repositories/channelRepository";

const getChannelsForUpdate = async (limit = 20) =>
  channelRepository.getChannelsToUpdate(limit);
