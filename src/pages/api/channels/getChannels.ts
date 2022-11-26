import type { NextApiRequest, NextApiResponse } from 'next';

import { channelRepository } from '../../../repositories/channelRepository';
import { handleApiError } from '../../../helpers/handleApiError';
import { getParameterFromQuery } from '../../../utils/getParameterFromQuery';

export const GET_CHANNELS_BY_FILTER_API_URL = '/api/channels/getChannels';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = Number(req.query['page']) || 0;
  const limit = Number(req.query['limit']) || 50;

  const sortType = getParameterFromQuery(req.query, 'sort_type');

  const sortDirection = getParameterFromQuery(req.query, 'sort_dir');

  const filterCategory = getParameterFromQuery(req.query, 'category');
  const searchString = getParameterFromQuery(req.query, 'search');

  const subscriptionsCountMin = getParameterFromQuery(req.query, 'subscriptionsCountMin');
  const subscriptionsCountMax = getParameterFromQuery(req.query, 'subscriptionsCountMax');

  try {
    const channels = await channelRepository.getChannelsByFilterWithSort({
      pageNumber: page,
      pageSize: limit,
      category: filterCategory,
      searchString: searchString,
      sort: {
        direction: sortDirection,
        type: sortType,
      },
      subscriptionsCount:
        subscriptionsCountMin || subscriptionsCountMax
          ? {
              max: subscriptionsCountMax ? Number(subscriptionsCountMax) : undefined,
              min: subscriptionsCountMin ? Number(subscriptionsCountMin) : undefined,
            }
          : undefined,
    });

    res.status(200).json(channels);
  } catch (error) {
    handleApiError(res, error);
  }
};
