import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Parser } from 'json2csv';

import { cartRepository } from '../../../repositories/cartRepository';
import { options } from '../auth/[...nextauth]';
import { handleApiError } from '../../../helpers/handleApiError';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const parser = new Parser();
    const session = await unstable_getServerSession(req, res, options);

    if (!session) {
      res.status(200).end();
      return;
    }

    const cart = await cartRepository.getCart(session?.user.id as string);

    const csvCart = parser.parse(cart?.cartItems || []);
    res.send(csvCart);
  } catch (error) {
    handleApiError(res, error);
  }
}
