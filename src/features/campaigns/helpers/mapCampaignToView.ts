import { DateTime } from 'luxon';

import { CampaignListItemProps } from '../components/screens/list/subComponents/CampaignListItem/CampaignListItem';
import { getAllCampaignsByUser } from '../repository/getAllCampaignsByUser';

export const mapCampaignToView = (
  campaigns: Awaited<ReturnType<typeof getAllCampaignsByUser>>,
): CampaignListItemProps[] | undefined => {
  return campaigns
    ? campaigns.map((campaign) => ({
        campaignId: campaign.id,
        name: undefined,
        creationDateTime: campaign.creationDateTime ? DateTime.fromISO(campaign.creationDateTime) : undefined,
        status: campaign.status,
        channels: campaign.ChannelsInCampaign.map((channelInCampaign) => ({
          channelId: channelInCampaign.channel.id,
          name: channelInCampaign.channel.name,
          category: channelInCampaign.channel.category?.name || undefined,
          price: undefined,
          subscribers: channelInCampaign.channel.subscribers || undefined,
          status: channelInCampaign.status,
        })),
      }))
    : undefined;
};
