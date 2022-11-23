import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import useSWR from 'swr';

import style from '../../scss/catalog.module.scss';

type CounterProps = {
  ssrCount: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const getKey = (category: string | undefined, search: string | undefined) => {
  let queryString = '';

  if (category) {
    queryString = queryString + `&category=${category}`;
  }
  if (search) {
    queryString = queryString + `&search=${search}`;
  }
  return `/api/channels/getCount?${queryString}`;
};

export const Counter: FC<CounterProps> = ({ ssrCount }) => {
  const router = useRouter();

  const { data } = useSWR(getKey(router.query.category as string, router.query.search as string), fetcher);

  return (
    <div className={style.content_channels}>
      <p className={style.content_channels_text}>Каналы:</p>
      <p className={style.content_channels_number}>{data ?? ssrCount}</p>
    </div>
  );
};
