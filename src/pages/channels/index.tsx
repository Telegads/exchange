import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';
import { getChannelsByUserId } from '../../features/channels/repository/getChannelsByUserId';
import { ChannelRow } from '../../components/ChannelRow/ChannelRow';
import { Button } from '../../components/Button/Button';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { EmptyState } from '../../components/EmptyState/EmptyState';

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

type ChannelsListPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ChannelsListPage = ({ channels }: ChannelsListPageProps) => {
  const { t } = useTranslation('channels');
  const isEmpty = channels?.length === 0;

  return (
    <Layout>
      <Container>
        <ScreenHeader
          rightSection={
            <Button variant="outline-primary" href="/channels/add">
              {t('list.addChannel')}
            </Button>
          }
        >
          <h1>{t('list.header')}</h1>
        </ScreenHeader>

        <Stack gap={3}>
          {channels?.map((channel) => (
            <ChannelRow {...channel} category={channel.category?.name} key={channel.id} />
          ))}
          {isEmpty && <EmptyState title={t('emptyState.title')} subtitle={t('emptyState.subtitle')} action="channel" />}
        </Stack>
      </Container>
    </Layout>
  );
};

export default ChannelsListPage;
