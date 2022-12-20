import { getChannelsToUpdate } from '../../features/channels/repository';

export const getChannelsForUpdate = (limit: number) => getChannelsToUpdate(limit);
