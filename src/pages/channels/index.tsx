import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container } from 'react-bootstrap';

import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';
import { getChannelsByUserId } from '../../features/channels/repository/getChannelsByUserId';
import { ChannelRow } from '../../components/ChannelRow/ChannelRow';

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
  console.log(channels);

  return (
    <Layout>
      <Container>
        {channels?.map((channel) => (
          <ChannelRow
            id={channel.id}
            key={channel.id}
            name={channel.name}
            avatar={channel.avatar}
            url={channel.url}
            description={channel.description}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default CampaignList;
