import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { useCallback, useState } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';
import { ChannelRow } from '../../components/ChannelRow/ChannelRow';
import { useUserNotification } from '../../hooks/useUserNotification';
import { AddChannelArg } from '../../features/channels/repository';
import { Button } from '../../components/Button/Button';
import { getAllCategories } from '../../features/channels/repository/getCategories';
import { getNewChannelInfo } from '../../features/channels/services/getNewChannelInfo';
import { mapNewChannelInfoToModel } from '../../features/channels/services/helpers/mapNewChannelInfoToModel';
import { getIdFromUrl } from '../../features/channels/services/helpers/getIdFromUrl';
import style from '../../scss/channels.module.scss';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
      throw new Error('No user provided');
    }

    const categories = await getAllCategories();

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['channels', 'common'])),
        categories,
        status: 'found',
      } as const,
    };
  } catch (error) {
    captureException(error);
    return {
      props: {
        categories: null,
      },
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

type AddChannelFormInputs = {
  channelUrl: string;
  category: string;
};

type AddChannelPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const AddChannelPage = ({ categories }: AddChannelPageProps) => {
  const { register, handleSubmit, watch } = useForm<AddChannelFormInputs>({
    defaultValues: {
      channelUrl: '',
    },
  });

  const [channelInfo, setChannelInfo] = useState<AddChannelArg['channel']>();

  const { notify } = useUserNotification();

  const { t } = useTranslation('channels');

  const selectedCategory = watch('category');

  const getChannelInfo: SubmitHandler<AddChannelFormInputs> = useCallback(
    async (data) => {
      try {
        console.log('getChannelInfo');

        const newChannelInfo = await getNewChannelInfo(getIdFromUrl(data.channelUrl));

        if (newChannelInfo.data.status === 'error') {
          throw new Error("Can't get channel info");
        }

        const newChannelModel = mapNewChannelInfoToModel({ newChannelInfo: newChannelInfo.data.data });
        setChannelInfo({ ...newChannelModel, url: data.channelUrl, isArchived: false, isBlogger: false });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          notify(error.message, 'error');
        }
      }
    },
    [notify],
  );

  const saveChannel = useCallback(async () => {
    try {
      if (!channelInfo) {
        throw new Error('No channel info');
      }

      await axios.post<any, any, Partial<AddChannelArg>>('/api/channels/addChannel', {
        categoryId: selectedCategory,
        channel: channelInfo,
      });
      notify(t('add.save.success'), 'success');
    } catch (error) {
      notify(t('add.save.error'), 'error');
    }
  }, [channelInfo, notify, selectedCategory, t]);

  return (
    <Layout>
      <Container className={style.container}>
        <Stack direction="vertical" gap={5}>
          <h1>{t('add.header')}</h1>
          <Form onSubmit={handleSubmit(getChannelInfo)}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t('add.channelUrl.label')}</Form.Label>
                  <Form.Control type="text" {...register('channelUrl')} />
                  <Form.Text className="text-muted">{t('add.channelUrl.description')}</Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Label>{t('add.channelCategory.label')}</Form.Label>
                <Form.Select {...register('category')}>
                  {categories?.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Button variant="primary" type="submit" className={style.get_channel_info_button}>
                  {t('add.getChannelInfoButton')}
                </Button>
              </Col>
            </Row>
          </Form>
          {channelInfo && (
            <>
              <h2>{t('add.preview')}</h2>
              <Row>
                <ChannelRow
                  {...channelInfo}
                  category={categories?.find((category) => category.id === selectedCategory)?.name}
                  id="tempId"
                />
              </Row>
            </>
          )}
          <Row>
            <Button variant="primary" onClick={saveChannel} disabled={!channelInfo}>
              {t('add.saveChannel')}
            </Button>
          </Row>
        </Stack>
      </Container>
    </Layout>
  );
};

export default AddChannelPage;
