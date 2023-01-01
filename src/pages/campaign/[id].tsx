import React, { useCallback } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Badge, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useRouter } from 'next/router';

import { getParameterFromQuery } from '../../utils/getParameterFromQuery';
import { options } from '../api/auth/[...nextauth]';
import { captureException } from '../../core/sentry';
import style from '../../scss/check.module.scss';
import { useUserNotification } from '../../hooks/useUserNotification';
import { getCampaignById } from '../../features/campaigns/repository/getCampaignById';
import { UpdateCampaignArgs } from '../../features/campaigns/repository/updateCampaign';
import { Button } from '../../components/Button/Button';
import Layout from '../../components/Layout/Layout';
import { Progress } from '../../components/Progress/Progress';
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader';

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
          postImage: data.postImage,
          postText: data.postText,
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
          postImage: data.postImage,
          postText: data.postText,
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
      <Container fluid>
        <Form onSubmit={handleSubmit(saveDraft)}>
          <Row>
            <Col md={9}>
              <div className={style.mainColumn}>
                <ScreenHeader preHeader={t('edit.step') || undefined} subHeader={t('edit.subtitle') || undefined}>
                  <Stack direction="horizontal" gap={4}>
                    <Stack direction="horizontal" gap={2}>
                      <h1 className={style.title}>{t('edit.header')}</h1>
                      <button className={style.editButton}>
                        <img className={style.editIcon} src="/img/icons/edit.svg" alt="edit" />
                      </button>
                    </Stack>
                    <Badge className={style.draft}>{t(`status.${campaign.status}`)}</Badge>
                  </Stack>
                </ScreenHeader>
                <div className={style.editFormSection}>
                  <Form.Group className={style.editGroup} controlId="formBasicFile">
                    <Form.Label className={style.editGroupTitle}>{t('edit.postImage')}</Form.Label>
                    <Form.Control type="text" {...register('postImage', { required: true })} />
                    <Form.Text className="text-muted">{t('edit.postImagePlaceholder')}</Form.Text>
                    <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className={style.editGroup} controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={style.editGroupTitle}>{t('edit.postText')}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      {...register('postText', { required: true })}
                      isInvalid={Boolean(errors.postText)}
                    />
                    <Form.Text className="text-muted">{t('edit.postTextPlaceholder')}</Form.Text>
                    <Form.Control.Feedback type="invalid">{t('edit.requiredField')}</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </Col>
            <Col md={3} className={style.cartColumn}>
              <Stack gap={4}>
                <Stack gap={3}>
                  <h2 className={style.editSidebarTitle}>{t('edit.sidebar.title')}</h2>

                  {watch('postImage') ? (
                    <img
                      className={style.editSidebarPreviewImgFull}
                      width="100%"
                      src={watch('postImage')}
                      alt="preview"
                    />
                  ) : (
                    <div className={style.emptyPreviewImage}>{t('edit.sidebar.emptyImage')}</div>
                  )}

                  {watch('postText') ? (
                    <div>{watch('postText')}</div>
                  ) : (
                    <Stack gap={1}>
                      <div className={style.emptyPreviewDescriptionLine}></div>
                      <div className={style.emptyPreviewDescriptionLine}></div>
                      <div className={style.emptyPreviewDescriptionLine}></div>
                    </Stack>
                  )}
                </Stack>
                <div className={style.editSidebarTotal}>
                  <div className={style.editSidebarTotalName}>{t('edit.sidebar.total')}</div>
                  <div className={style.editSidebarTotalValue}>Будет рассчитана позже</div>
                </div>
                <Stack gap={2}>
                  <Button
                    className={style.editSidebarSaveForModeration}
                    variant="primary"
                    onClick={handleSubmit(saveForModeration)}
                    disabled={!isValid}
                  >
                    {t('edit.saveForModeration')}
                  </Button>
                  <Button
                    className={style.editSidebarSaveForDraft}
                    variant="outline-primary"
                    type="submit"
                    disabled={!isValid}
                  >
                    {t('edit.saveDraft')}
                  </Button>
                </Stack>
              </Stack>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
};
//https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png
export default CampaignEditor;
