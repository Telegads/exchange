import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ChannelTableRow, ChannelTableRowProps } from './ChannelTableRow';
import style from './channelsTable.module.scss';

type ChannelsTableProps = {
  channels: ChannelTableRowProps[];
};

export const ChannelsTable: FC<ChannelsTableProps> = ({ channels }) => {
  const { t } = useTranslation('campaign');

  return (
    <div className={style.ChannelsTable}>
      <Table hover size="sm" borderless>
        <thead>
          <tr>
            <th>{t('list.item.channelTableHeader.name')}</th>
            <th>{t('list.item.channelTableHeader.category')}</th>
            <th>{t('list.item.channelTableHeader.subscribers')}</th>
          </tr>
        </thead>
        <tbody>
          {channels?.map((channel) => (
            <ChannelTableRow key={channel.channelId} {...channel} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
