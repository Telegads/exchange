import axios from 'axios';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import { getChannelsByFilterWithSort } from '../features/channels/repository';

export type FetchChannelsByFilterResult = ReturnType<typeof getChannelsByFilterWithSort>;

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
