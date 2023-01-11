import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { useMemo } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';
import { getAllCampaignsByUser } from '../../features/campaigns/repository/getAllCampaignsByUser';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';
import { CampaignList } from '../../features/campaigns/components/screens/list';
import { mapCampaignToView } from '../../features/campaigns/helpers/mapCampaignToView';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
      throw new Error('No user provided');
    }

    const campaigns = await getAllCampaignsByUser(session.user.id);

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['campaign', 'common'])),
        status: 'found',
        campaigns: campaigns.map((campaign) => ({
          ...campaign,
        })),
      } as const,
    };
  } catch (error) {
    captureException(error);
    return {
      props: {
        status: 'not found',
        campaigns: null,
      } as const,
    };
  }
}

type CampaignListPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const CampaignListPage = ({ campaigns }: CampaignListPageProps) => {
  const { t } = useTranslation('campaign');
  const campaignsArray = useMemo(() => (campaigns ? mapCampaignToView(campaigns) : []), [campaigns]);
  const isEmpty = campaignsArray?.length === 0;
  console.log(isEmpty);

  return (
    <Layout>
      <Container>
        <ScreenHeader>
          <h1>{t('list.header')}</h1>
        </ScreenHeader>
        {!isEmpty && campaignsArray ? (
          <CampaignList list={campaignsArray} />
        ) : (
          <EmptyState title={t('emptyState.title')} subtitle={t('emptyState.subtitle')} action="campaign" />
        )}
      </Container>
    </Layout>
  );
};

export default CampaignListPage;
