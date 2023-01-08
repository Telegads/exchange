import React, { FC } from 'react';
import { Stack } from 'react-bootstrap';

import { CampaignListItem, CampaignListItemProps } from './subComponents/CampaignListItem/CampaignListItem';

type CampaignListProps = {
  list: CampaignListItemProps[];
};

export const CampaignList: FC<CampaignListProps> = ({ list }) => {
  return (
    <Stack direction="vertical" gap={3}>
      {list.map((item) => (
        <CampaignListItem
          key={item.campaignId}
          campaignId={item.campaignId}
          creationDateTime={item.creationDateTime}
          name={item.name}
          status={item.status}
          channels={item.channels}
        />
      ))}
    </Stack>
  );
};
