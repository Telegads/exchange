import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { useSentry } from '../../hooks/useSentry';

import style from './counter.module.scss';

type CounterProps = {
  ssrCount: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const getKey = (routerQuery: Record<string, string>) => {
  const searchParams = new URLSearchParams(routerQuery);

  return `/api/channels/getCount?${searchParams.toString()}`;
};

export const Counter: FC<CounterProps> = ({ ssrCount }) => {
  const router = useRouter();
  const captureToSentry = useSentry();
  const { t } = useTranslation('common');

  const { data, error } = useSWR<number>(getKey(router.query as Record<string, string>), fetcher);

  if (error) {
    captureToSentry(error);
  }

  const count = data ?? ssrCount;

  return (
    <div className={style.content_channels}>
      <p className={style.content_channels_text}>{t('channels.title')}:</p>
      <p className={style.content_channels_number}>{count.toLocaleString('ru-RU')}</p>
    </div>
  );
};
