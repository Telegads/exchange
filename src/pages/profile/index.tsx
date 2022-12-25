import { captureException } from '@sentry/nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React, { useCallback } from 'react';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { signOut } from 'next-auth/react';

import { options } from '../api/auth/[...nextauth]';
import Layout from '../../components/Layout/Layout';
import { Button } from '../../components/Button/Button';
import style from '../../scss/channels.module.scss';
import { getUserById } from '../../features/users/repository';
import { UpdateUserRequestBody } from '../api/user/update';
import { useUserNotification } from '../../hooks/useUserNotification';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await unstable_getServerSession(context.req, context.res, options);

    if (!session?.user?.id) {
      throw new Error('No user provided');
    }

    const user = await getUserById(session.user.id);

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['profile', 'common'])),
        user,
      } as const,
    };
  } catch (error) {
    captureException(error);
    return {
      props: {
        user: null,
      },
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

type UserInfoPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type UserInfoForm = {
  name: string | undefined;
};

const UserInfoPage = ({ user }: UserInfoPageProps) => {
  const { t } = useTranslation('profile');
  const { notify } = useUserNotification();

  const { register, handleSubmit } = useForm<UserInfoForm>({
    defaultValues: {
      name: user?.name ? user.name : undefined,
    },
  });

  const handleFormSubmit: SubmitHandler<UserInfoForm> = useCallback(
    async (data) => {
      try {
        await axios.post<any, any, UpdateUserRequestBody>('/api/user/update', {
          userData: {
            name: data.name,
          },
        });

        notify(t('save.status.success'), 'success');
      } catch (error) {
        console.log(error);
        captureException(error);
        notify(t('save.status.error'), 'error');
      }
    },
    [notify, t],
  );

  const handleSingOutClick = useCallback(() => signOut(), []);

  return (
    <Layout>
      <Container className={style.container}>
        <Stack gap={5}>
          <Row>
            <Col>
              <h1>{t('header')}</h1>
            </Col>
            <Col md={3}>
              <Button variant="outline-danger" onClick={handleSingOutClick}>
                {t('exit')}
              </Button>
            </Col>
          </Row>

          <Stack gap={3}>
            <Row>
              <Col md={2}>{t('view.name')}</Col>
              <Col>{user?.name}</Col>
            </Row>
            <Row>
              <Col md={2}>{t('view.id')}</Col>
              <Col>{user?.id}</Col>
            </Row>
            <Row>
              <Col md={2}>{t('view.tgId')}</Col>
              <Col>{user?.tgId}</Col>
            </Row>
            <Row>
              <Col md={2}>{t('view.email')}</Col>
              <Col>{user?.email}</Col>
            </Row>
          </Stack>
          <Col md={9}>
            <h2>{t('form.header')}</h2>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t('form.userName')}</Form.Label>
                <Form.Control type="text" {...register('name')} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {t('form.save')}
              </Button>
            </Form>
          </Col>
        </Stack>
      </Container>
    </Layout>
  );
};

export default UserInfoPage;
