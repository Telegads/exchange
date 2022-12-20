import type { NextApiRequest, NextApiResponse } from 'next';

import { countByFilter } from '../../../features/channels/repository';
import { handleApiError } from '../../../helpers/handleApiError';
import { getParameterFromQuery } from '../../../utils/getParameterFromQuery';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const subscriptionsCountMin = getParameterFromQuery(req.query, 'subscriptionsCountMin');
  const subscriptionsCountMax = getParameterFromQuery(req.query, 'subscriptionsCountMax');

  try {
    const { _count: count } = await countByFilter({
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
