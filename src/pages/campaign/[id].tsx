import React, { useCallback } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Badge, ButtonGroup, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useRouter } from 'next/router';

import { getParameterFromQuery } from '../../utils/getParameterFromQuery';
import { options } from '../api/auth/[...nextauth]';
import { captureException } from '../../core/sentry';
import Layout from '../../components/Layout/Layout';
import { Progress } from '../../components/Progress/Progress';
import style from '../../scss/check.module.scss';
import { Button } from '../../components/Button/Button';
import { useUserNotification } from '../../hooks/useUserNotification';
import { getCampaignById } from '../../features/campaigns/repository/getCampaignById';
import { UpdateCampaignArgs } from '../../features/campaigns/repository/updateCampaign';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
      throw new Error('No user provided');
    }

    const campaignId = getParameterFromQuery(context?.query, 'id');

    if (!campaignId) {
      throw new Error('No campaign ID provided');
    }

    const campaign = await getCampaignById(campaignId);

    if (!campaign) {
      throw new Error('Campaign not found');
    }
    if (campaign?.userId !== session.user.id) {
      throw new Error('Campaign is owned by another user');
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['campaign', 'common'])),
        status: 'found',
        campaign,
      } as const,
    };
  } catch (error) {
    captureException(error);
    return {
      props: {
        status: 'not found',
        campaign: null,
      } as const,
    };
  }
}

type CampaignEditorProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type Inputs = {
  postImage: string;
  postText: string;
};

const CampaignEditor = ({ campaign, status }: CampaignEditorProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      postImage: campaign?.postImage || undefined,
      postText: campaign?.postText || undefined,
    },
  });

  const { notify } = useUserNotification();

  const { t } = useTranslation('campaign');

  const saveDraft: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (!campaign?.id) {
        return;
      }

      try {
        await axios.post<any, any, UpdateCampaignArgs>('/api/campaign/update', {
          id: campaign.id,
          status: 'DRAFT',
          postText: data.postText,
          postImage: data.postImage,
          channels: campaign.channels.map((channel) => ({ id: channel.id })),
        });
        notify('ok', 'success');
      } catch (error) {
        notify('not ok', 'error');
      }
    },
    [campaign?.channels, campaign?.id, notify],
  );

  const saveForModeration: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (!campaign?.id) {
        return;
      }

      try {
        await axios.post<any, any, UpdateCampaignArgs>('/api/campaign/update', {
          id: campaign.id,
          status: 'READY_FOR_MODERATION',
          postText: data.postText,
          postImage: data.postImage,
          channels: campaign.channels.map((channel) => ({ id: channel.id })),
        });
        notify('ok', 'success');
        router.push('/campaign');
      } catch (error) {
        notify('not ok', 'error');
      }
    },
    [campaign?.channels, campaign?.id, notify, router],
  );

  if (status === 'not found') {
    return <p>Nothing to de here!</p>;
  }

  return (
    <Layout>
      <Progress position={66} />
      <Container>
        <h1>
          {t('edit.header')} <Badge bg="secondary">{campaign.status}</Badge>
        </h1>

        <Form onSubmit={handleSubmit(saveDraft)}>
          <Row>
            <Col md={9}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('edit.postImage')}</Form.Label>
                <Form.Control type="text" {...register('postImage')} />
                <Form.Text className="text-muted">Формат изображения png, jpg, GIF, не более 1280х1080px</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{t('edit.postText')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('postText', { required: true })}
                  isInvalid={Boolean(errors.postText)}
                />
                <Form.Text className="text-muted">
                  максимум символов в посте с картинкой - 1000, без медиафайлов - 3500
                </Form.Text>
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className={style.cartColumn}>
              <div className={style.stickySidebar}>
                <Image className={style.image} src={watch('postImage')} />
                <p>{watch('postText')}</p>
                <ButtonGroup vertical>
                  <Button variant="primary" onClick={handleSubmit(saveForModeration)} disabled={!isValid}>
                    {t('edit.saveForModeration')}
                  </Button>
                  <Button variant="outline-primary" type="submit" disabled={!isValid}>
                    {t('edit.saveDraft')}
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
};
//https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png
export default CampaignEditor;
