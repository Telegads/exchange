import { captureException } from '../../../core/sentry';
import { notifyAdmins } from '../../tg_notifications/services/notifyAdmins';
import { notifyChannelOwner } from '../../tg_notifications/services/notifyChannelOwner';
import { createNewCampaign, CreateNewCampaignArgs } from '../repository/createNewCampaign';

type ReturnType =
  | {
      status: 'success';
      campaignId: string;
    }
  | {
      status: 'error';
      campaignId: null;
    };

export const addNewCampaign = async ({ channels, userId }: CreateNewCampaignArgs): Promise<ReturnType> => {
  try {
    const [campaign] = await createNewCampaign({ channels, userId });

    await notifyAdmins({ text: `New campaign. ID: ${campaign.id}` });

    await notifyChannelOwner({ channels });

    return {
      status: 'success',
      campaignId: campaign.id,
    };
  } catch (error) {
    captureException(error);
    return {
      status: 'error',
      campaignId: null,
    };
  }
};
