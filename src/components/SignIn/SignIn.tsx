import React, { useCallback } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { CgArrowRight } from 'react-icons/cg';

import { Button } from '../Button/Button';
import { useUserNotification } from '../../hooks/useUserNotification';

import style from './signin.module.scss';

type TokenInputFormType = {
  token: string;
};

interface SignInProps {
  onSuccessAuth: () => void;
}

export default function SignIn({ onSuccessAuth }: SignInProps) {
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
        onSuccessAuth();
      } catch (error) {
        notify('auth internal error. try again', 'error');
      }
    },
    [notify, setError],
  );

  return (
    <>
      <h1 className={style.signin__title}>Вход</h1>
      <a href="https://t.me/telegads_official_bot" target="_blank" rel="noreferrer">
        Для авторизации напишите боту, он пришлет код, который надо вставить ниже
      </a>
      <br />
      <Form onSubmit={handleSubmit(handleTokenSubmit)}>
        {errors.token && <Alert variant="danger">{errors.token.message}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Код от бота</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите код, который прислал бот"
            {...register('token')}
            className={style.signin__control}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size="lg" className={style.signin__btn}>
          Далее
          <CgArrowRight size={20} />
        </Button>
      </Form>
    </>
  );
}
