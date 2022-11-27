import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { handleApiError } from '../../../helpers/handleApiError';
import { cartRepository } from '../../../repositories/cartRepository';
import { options } from '../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await unstable_getServerSession(req, res, options);

    if (!session) {
      res.status(200).end();
      return;
    }

    const cart = await cartRepository.getCart(session?.user.id as string);

    res.json(cart);
  } catch (error) {
    handleApiError(res, error);
  }
}
