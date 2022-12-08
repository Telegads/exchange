import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { HTTP_STATUS } from '../../../constants';
import { handleApiError } from '../../../helpers/handleApiError';
import { campaignRepository } from '../../../repositories/campaignRepository';
import { options } from '../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.channels || !Array.isArray(req.body.channels)) {
    res.status(HTTP_STATUS.INVALID_CLIENT_REQUEST).send('Channels should be an array');
  }

  if (!req.body.channels[0].id) {
    res.status(HTTP_STATUS.INVALID_CLIENT_REQUEST).send('Channels[] should contain id field ');
  }

  try {
    const session = await unstable_getServerSession(req, res, options);

    if (!session?.user?.id) {
      res.status(HTTP_STATUS.NOT_AUTHORIZED).end();
      return;
    }

    console.log(session.user.id);

    const campaign = await campaignRepository.createNewCampaign({
      channels: req.body.channels,
      userId: session.user.id,
    });

    res.json(campaign);
  } catch (error) {
    handleApiError(res, error);
  }
}
