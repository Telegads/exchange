import axios from 'axios';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import { channelRepository } from '../repositories/channelRepository';

export type FetchChannelsByFilterResult = ReturnType<typeof channelRepository.getChannelsByFilterWithSort>;

export const CatalogFetcher = (url: string) => axios.get<FetchChannelsByFilterResult>(url).then((res) => res.data);

export const useGetChannels = (getKey: SWRInfiniteKeyLoader) => {
  const { data, size, setSize, error } = useSWRInfinite(getKey, CatalogFetcher);

  return {
    data: data,
    size: size,
    setSize: setSize,
    error: error,
    isLoading: !data && !error,
  };
};
