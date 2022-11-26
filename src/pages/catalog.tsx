import React, { FC, useCallback, useMemo } from 'react';
import { Category, Channel, Format } from '@prisma/client';
import axios from 'axios';
import useSWRInfinite from 'swr/infinite';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { useSession } from 'next-auth/react';

import { ChannelRow } from '../components/ChannelRow/ChannelRow';
import { Sorting } from '../components/Sorting/Sorting';
import Layout from '../components/Layout';
import { Filter } from '../components/Filter/Filter';
import style from '../scss/catalog.module.scss';
import { Button } from '../components/Button/Button';
import { Counter } from '../components/Counter/Counter';
import { channelRepository } from '../repositories/channelRepository';
import { getParameterFromQuery } from '../utils/getParameterFromQuery';
import { categoryRepository } from '../repositories/categoryRepository';
import { CartContextProvider } from '../components/Cart/context/CartContext';
import { Cart } from '../components/Cart/Card';
import { useGetCartValue } from '../components/Cart/hooks/useGetCartValue';

export type ChannelWithTagsAndFormats = Channel & {
  formats: Format[];
  category: Category;
};

const PAGE_SIZE = 50;

export async function getServerSideProps(context: NextPageContext) {
  const searchString = getParameterFromQuery(context.query, 'search');
  const filterCategory = getParameterFromQuery(context.query, 'category');

  const sortType = getParameterFromQuery(context.query, 'sort_type');
  const sortDirection = getParameterFromQuery(context.query, 'sort_dir');

  const channels = await channelRepository.getChannelsByFilterWithSort({
    pageNumber: 0,
    pageSize: PAGE_SIZE,
    category: filterCategory,
    searchString: searchString,
    sort: {
      direction: sortDirection,
      type: sortType,
    },
  });
  const categories = await categoryRepository.getAllCategories();

  const { _count: channelsCount } = await channelRepository.countAll();

  return {
    props: {
      ssr: {
        channels: channels.map((channel) => ({
          ...channel,
          lastUpdateDateTime: '',
        })),
        channelsCount: channelsCount.id,
        categories,
      },
    }, // will be passed to the page component as props
  };
}

const fetcher = (url: string) => axios.get<ChannelWithTagsAndFormats[]>(url).then((res) => res.data);

const Catalog: FC<{
  ssr: {
    channels: ChannelWithTagsAndFormats[];
    channelsCount: number;
    categories: Category[];
  };
}> = ({ ssr }) => {
  const router = useRouter();

  const { cartValue, updateCartValue, isInCart } = useGetCartValue();

  const cartContextValue = useMemo(
    () => ({
      cartValue,
      updateCartValue,
      isInCart,
    }),
    [cartValue, isInCart, updateCartValue],
  );

  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;

      const searchParams = new URLSearchParams(router.query as Record<string, string>);
      searchParams.set('limit', PAGE_SIZE.toFixed());

      if (pageIndex) {
        searchParams.set('page', pageIndex);
      }

      return `/api/channels/getChannels?${searchParams.toString()}`;
    },
    [router],
  );

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const channels = data?.map((chunk) => chunk).flat() ?? ssr.channels;

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const loadMore = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  const { data: session } = useSession();

  return (
    <CartContextProvider value={cartContextValue}>
      <Layout session={session}>
        <div className={style.line}></div>
        {/* <Navigation /> */}
        <div className={style.wrapper}>
          {/* <div className={style.line_navbar}></div> */}
          <Filter categories={ssr.categories} />
          <div className={style.line_filter}></div>
          <div className={style.content}>
            <div className={style.content__display_no}>
              <div className={style.content__wrapper}>
                <div className={style.content__header}>
                  <h1>Каталог Telegram-каналов</h1>
                  <Counter ssrCount={ssr.channelsCount} />
                </div>
                <Sorting />
              </div>
              <div className={style.catalog_rows}>
                {channels.map((channel) => (
                  <ChannelRow channelInfo={channel} key={channel.id} />
                ))}
              </div>
              {!isReachingEnd && (
                <div className={style.loadMore}>
                  <Button onClick={loadMore} type="primary">
                    Load more
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Cart />
      </Layout>
    </CartContextProvider>
  );
};

export default Catalog;
