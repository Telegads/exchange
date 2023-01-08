import React, { FC, useMemo } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { BsCheckSquare, BsClock, BsHandThumbsUp, BsXSquare } from 'react-icons/bs';

import { Progress } from '../../../../../../../components/Progress/Progress';
import { ChannelTableRowProps } from '../ChannelsTable/ChannelTableRow';

import style from './campaignProgress.module.scss';

type CampaignProgressProps = {
  channels: ChannelTableRowProps[];
};

export const CampaignProgress: FC<CampaignProgressProps> = ({ channels }) => {
  const total = useMemo(() => channels.length, [channels.length]);

  const accepted = useMemo(() => channels.filter((channel) => channel.status === 'ACCEPTED').length, [channels]);
  const done = useMemo(() => channels.filter((channel) => channel.status === 'DONE').length, [channels]);
  const decline = useMemo(() => channels.filter((channel) => channel.status === 'DECLINE').length, [channels]);
  const waiting = useMemo(() => channels.filter((channel) => channel.status === 'WAITING').length, [channels]);

  return (
    <Stack>
      <Stack className={style.ProgressCount} direction="horizontal">
        <div>0</div>
        <div>{total}</div>
      </Stack>
      {<Progress className={style.ProgressBar} position={done / total} variant="success" />}

      <Row>
        <Col>
          <BsHandThumbsUp /> {accepted}
        </Col>
        <Col>
          <BsXSquare /> {decline}
        </Col>
        <Col>
          <BsCheckSquare /> {done}
        </Col>
        <Col>
          <BsClock /> {waiting}
        </Col>
      </Row>
    </Stack>
  );
};
