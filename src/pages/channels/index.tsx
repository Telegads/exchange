import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';
import { getChannelsByUserId } from '../../features/channels/repository/getChannelsByUserId';
import { ChannelRow } from '../../components/ChannelRow/ChannelRow';
import { Button } from '../../components/Button/Button';
import style from '../../scss/channels.module.scss';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
      throw new Error('No user provided');
    }

    const channels = await getChannelsByUserId(session.user.id);

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['channels', 'common'])),
        status: 'found',
        channels,
      } as const,
    };
  } catch (error) {
    captureException(error);
    return {
      props: {
        status: 'not found',
        channels: null,
      } as const,
    };
  }
}

type CampaignListProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const CampaignList = ({ channels }: CampaignListProps) => {
  const { t } = useTranslation('channels');

  return (
    <Layout>
      <Container className={style.container}>
        <Stack gap={5}>
          <Row>
            <Col>
              <h1>{t('list.header')}</h1>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" href="/channels/add">
                {t('list.addChannel')}
              </Button>
            </Col>
          </Row>

          <Stack gap={3}>
            {channels?.map((channel) => (
              <ChannelRow {...channel} category={channel.category?.name} key={channel.id} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default CampaignList;
