import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { handleApiError } from '../../../helpers/handleApiError';
import { getUserById } from '../../../features/users/repository/';
import { options } from '../auth/[...nextauth]';
import { addChannel, AddChannelArg } from '../../../features/channels/repository';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { channel, categoryId } = req.body.channels as AddChannelArg;
    const session = await unstable_getServerSession(req, res, options);

    if (req.method?.toUpperCase() !== 'POST') {
      throw new Error('only POST methods allowed');
    }

    if (!channel) {
      throw new Error('channels should be defined');
    }

    if (!session?.user?.id) {
      throw new Error('Session user was not provided');
    }

    const user = getUserById(session?.user.id);

    if (!user) {
      throw new Error('Unknown user');
    }

    const addedChannel = await addChannel({
      channel,
      ownerId: session.user.id,
      categoryId,
    });

    res.json(addedChannel);
  } catch (error) {
    handleApiError(res, error);
  }
}
