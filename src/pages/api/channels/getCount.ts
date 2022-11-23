import type { NextApiRequest, NextApiResponse } from 'next';

import { handleApiError } from '../../../helpers/handleApiError';
import { channelRepository } from '../../../repositories/channelRepository';
import { getParameterFromQuery } from '../../../utils/getParameterFromQuery';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _count: count } = await channelRepository.countByFilter({
      category: getParameterFromQuery(req.query, 'category'),
      search: getParameterFromQuery(req.query, 'search'),
    });

    res.status(200).json(count.id);
  } catch (error) {
    handleApiError(res, error);
  }
};
