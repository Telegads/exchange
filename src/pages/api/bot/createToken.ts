import { NextApiRequest, NextApiResponse } from 'next';

import { createAuthTokenForBot } from '../../../features/users/services/createAuthTokenForBot';
import { handleApiError } from '../../../helpers/handleApiError';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tgId, name } = req.body;

    const token = await createAuthTokenForBot({ tgId, name });

    res.json(token);
  } catch (error) {
    handleApiError(res, error);
  }
}
