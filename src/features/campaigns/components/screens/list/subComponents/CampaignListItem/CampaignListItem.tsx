import axios from 'axios';
import { DateTime } from 'luxon';
import React, { FC, useCallback, useState } from 'react';
import { Badge, Col, Row, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsChevronDown, BsChevronUp, BsClipboardData, BsClock, BsGear, BsXSquare } from 'react-icons/bs';

import { Button } from '../../../../../../../components/Button/Button';
import { DateTimeString } from '../../../../../../../components/Formatters/DateTimeString/DateTimeString';
import { captureException } from '../../../../../../../core/sentry';
import { useUserNotification } from '../../../../../../../hooks/useUserNotification';
import { CampaignProgress } from '../CampaignProgress/CampaignProgress';
import { ChannelsTable } from '../ChannelsTable/ChannelsTable';
import { ChannelTableRowProps } from '../ChannelsTable/ChannelTableRow';

import style from './campaignListItem.module.scss';

export type CampaignListItemProps = {
  campaignId: string;
  name?: string | undefined;
  creationDateTime?: DateTime | undefined;
  status?: string | undefined;
  channels: ChannelTableRowProps[];
};

export const CampaignListItem: FC<CampaignListItemProps> = ({
  status,
  creationDateTime,
  name,
  channels,
  campaignId,
}) => {
  const { t } = useTranslation('campaign');

  const { notify } = useUserNotification();

  const [isChannelsTableOpen, setChannelsTableOpen] = useState(false);

  const handleChannelToggle = useCallback(() => setChannelsTableOpen(!isChannelsTableOpen), [isChannelsTableOpen]);

  const handleDeleteCampaign = useCallback(async () => {
    try {
      await axios.post('/api/campaign/delete', {
        campaignId,
      });
      window?.location?.reload();
    } catch (error) {
      captureException(error);
      notify(t('list.item.deleteError'), 'error');
    }
  }, [campaignId, notify, t]);

  return (
    <div>
      <Row className={style.CampaignItmTitle}>
        <Col>{name || t('noName')}</Col>
        <Col>
          <Badge pill bg="secondary">
            {status}
          </Badge>
        </Col>
        <Col>
          {creationDateTime && (
            <>
              <BsClock /> <DateTimeString date={creationDateTime} />
            </>
          )}
        </Col>
        <Col>
          <CampaignProgress channels={channels} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Stack gap={4} className={style.CampaignActions}>
          <Row>
            <Col md={4}>
              <Button variant="link" onClick={handleChannelToggle}>
                <Stack direction="horizontal" gap={2}>
                  {t('list.item.showChannels')}{' '}
                  {isChannelsTableOpen ? <BsChevronUp size={24} /> : <BsChevronDown size={24} />}
                </Stack>
              </Button>
            </Col>
            <Col>
              <Button variant="link" disabled>
                <Stack direction="horizontal" gap={2}>
                  {t('list.item.report')} <BsClipboardData size={24} />
                </Stack>
              </Button>
            </Col>
            <Col>
              <Button variant="link" href={`campaign/${campaignId}`}>
                <Stack direction="horizontal" gap={2}>
                  {t('list.item.edit')} <BsGear size={24} />
                </Stack>
              </Button>
            </Col>
            <Col>
              <Button className={style.DeleteButton} variant="link" onClick={handleDeleteCampaign}>
                <Stack direction="horizontal" gap={2}>
                  {t('list.item.remove')} <BsXSquare size={24} />
                </Stack>
              </Button>
            </Col>
          </Row>
          {isChannelsTableOpen && <ChannelsTable channels={channels} />}
        </Stack>
      </Row>
    </div>
  );
};
