import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { HTTP_STATUS } from '../../../constants';
import { deleteCampaignById } from '../../../features/campaigns/repository/delete';
import { getCampaignById } from '../../../features/campaigns/repository/getCampaignById';
import { handleApiError } from '../../../helpers/handleApiError';
import { options } from '../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.campaignId) {
    res.status(HTTP_STATUS.INVALID_CLIENT_REQUEST).json({
      status: 'error',
      message: 'CampaignId should be with id',
    });
    return;
  }

  try {
    const session = await unstable_getServerSession(req, res, options);

    if (!session?.user?.id) {
      res.status(HTTP_STATUS.NOT_AUTHORIZED).json({
        status: 'error',
      });
      return;
    }

    const campaign = await getCampaignById(req.body.campaignId);

    if (campaign?.userId !== session?.user?.id) {
      res.status(HTTP_STATUS.INVALID_CLIENT_REQUEST).json({
        status: 'error',
        message: 'Only owner of campaign can delete',
      });
      return;
    }

    await deleteCampaignById(req.body.campaignId);

    res.json({
      status: 'success',
    });
  } catch (error) {
    handleApiError(res, error);
  }
}
