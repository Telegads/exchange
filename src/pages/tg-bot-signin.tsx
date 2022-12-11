import React, { useCallback } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { Button } from '../components/Button/Button';
import { useUserNotification } from '../hooks/useUserNotification';
import Layout from '../components/Layout/Layout';

type TokenInputFormType = {
  token: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TokenInputFormType>();
  const { notify } = useUserNotification();

  const handleTokenSubmit = useCallback(
    async (data) => {
      try {
        const response = await signIn('telegram-bot-token', { redirect: false, token: data.token });

        if (response?.error) {
          return setError('token', { message: 'invalid token' });
        }

        notify('auth ok', 'success');
      } catch (error) {
        notify('auth internal error. try again', 'error');
      }
    },
    [notify, setError],
  );

  return (
    <Layout>
      <h1>Авторизация через тг бота!</h1>
      <a href="https://t.me/telegads_official_bot">
        Для авторизации напишите боту, он пришлет код, который надо вставить ниже
      </a>

      <Form onSubmit={handleSubmit(handleTokenSubmit)}>
        {errors.token && <Alert variant="danger">{errors.token.message}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Код от бота</Form.Label>
          <Form.Control type="text" placeholder="Токен от бота" {...register('token')} />
          <Form.Text className="text-muted">Введите код, который прислал бот.</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
}
