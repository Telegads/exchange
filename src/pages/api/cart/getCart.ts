import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { cartRepository } from '../../../repositories/cartRepository';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    const cart = await cartRepository.getCart(session?.user.id as string);

    res.json(cart);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}
