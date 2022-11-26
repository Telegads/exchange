import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { cartRepository, UpdateCartArg } from '../../../repositories/cartRepository';
import { userRepository } from '../../../repositories/userRepository';
import { options } from '../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const channels = req.body.channels as UpdateCartArg['channelIds'];
    const session = await unstable_getServerSession(req, res, options);

    if (req.method !== 'POST') {
      throw new Error('only POST methods allowed');
    }

    if (!channels) {
      throw new Error('channels should be defined');
    }

    if (!Array.isArray(channels)) {
      throw new Error('channels should be an array');
    }

    const ids = channels.map((ch) => ch.id).filter((id) => id !== undefined);

    if (channels.length && ids.length === 0) {
      throw new Error('channels should contain id field');
    }

    if (!session?.user?.id) {
      throw new Error('Session user was not provided');
    }

    const user = userRepository.getUserById(session?.user.id);

    if (!user) {
      throw new Error('Unknown user');
    }

    const updatedCart = await cartRepository.updateCart({
      channelIds: channels,
      userId: session.user.id,
    });

    res.json(updatedCart);
  } catch (error) {
    res.status(500);
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.send('internalError');
    console.log(error);
  }
}
