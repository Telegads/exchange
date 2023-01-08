import { CampaignChannelStatus } from '@prisma/client';
import React, { FC } from 'react';

import { Decimal } from '../../../../../../../components/Formatters/Decimal/Decimal';

export type ChannelTableRowProps = {
  channelId: string;
  name: string;
  category: string | undefined;
  price?: number | undefined;
  subscribers?: number | undefined;
  status: CampaignChannelStatus;
};

export const ChannelTableRow: FC<ChannelTableRowProps> = ({ category, name, subscribers }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{category}</td>
      <td>
        <Decimal number={subscribers || 0} />
      </td>
    </tr>
  );
};
