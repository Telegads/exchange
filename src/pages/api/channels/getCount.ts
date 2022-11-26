import type { NextApiRequest, NextApiResponse } from 'next';

import { handleApiError } from '../../../helpers/handleApiError';
import { channelRepository } from '../../../repositories/channelRepository';
import { getParameterFromQuery } from '../../../utils/getParameterFromQuery';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const subscriptionsCountMin = getParameterFromQuery(req.query, 'subscriptionsCountMin');
  const subscriptionsCountMax = getParameterFromQuery(req.query, 'subscriptionsCountMax');

  try {
    const { _count: count } = await channelRepository.countByFilter({
      category: getParameterFromQuery(req.query, 'category'),
      searchString: getParameterFromQuery(req.query, 'search'),
      subscriptionsCount:
        subscriptionsCountMin || subscriptionsCountMax
          ? {
              max: subscriptionsCountMax ? Number(subscriptionsCountMax) : undefined,
              min: subscriptionsCountMin ? Number(subscriptionsCountMin) : undefined,
            }
          : undefined,
    });

    res.status(200).json(count.id);
  } catch (error) {
    handleApiError(res, error);
  }
};
