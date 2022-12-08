import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Table } from 'react-bootstrap';
import Link from 'next/link';

import { campaignRepository } from '../../repositories/campaignRepository';
import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
      throw new Error('No user provided');
    }

    const campaigns = await campaignRepository.getAllCampaignsByUser(session.user.id);

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['campaign'])),
        status: 'found',
        campaigns,
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

type CampaignListProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const CampaignList = ({ campaigns }: CampaignListProps) => {
  console.log(campaigns);

  return (
    <Layout>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns?.map((campaign) => (
              <tr key={campaign.id}>
                <td>
                  <Link href={`/campaign/${campaign.id}`}>{campaign.id}</Link>
                </td>
                <td>{campaign.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default CampaignList;
