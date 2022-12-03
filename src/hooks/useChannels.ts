import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import { CatalogFetcher } from '../pages/catalog';

export const useChannels = (getKey: SWRInfiniteKeyLoader) => {
  const { data, size, setSize, error } = useSWRInfinite(getKey, CatalogFetcher);

  return {
    data: data,
    size: size,
    setSize: setSize,
    error: error,
    isLoading: !data && !error,
  };
};
