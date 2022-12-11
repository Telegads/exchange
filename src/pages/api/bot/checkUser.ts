import { NextApiRequest, NextApiResponse } from 'next';

import { getUserByTgId } from '../../../features/users/repository';
import { handleApiError } from '../../../helpers/handleApiError';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tgId } = req.body;

    console.log(tgId);

    const user = await getUserByTgId({ tgId });

    if (!user.length) {
      return res.send({
        status: 'notFound',
        user: null,
      });
    }

    res.send({ status: 'found', user: user[0] });
  } catch (error) {
    handleApiError(res, error);
  }
}
