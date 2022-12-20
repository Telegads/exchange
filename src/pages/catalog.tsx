import React, { useCallback, useMemo } from 'react';
import { Category, Channel, Format } from '@prisma/client';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { ChannelRow } from '../components/ChannelRow/ChannelRow';
import { Sorting } from '../components/Sorting/Sorting';
import Layout from '../components/Layout/Layout';
import { Filter } from '../components/Filter/Filter';
import style from '../scss/catalog.module.scss';
import { Button } from '../components/Button/Button';
import { Counter } from '../components/Counter/Counter';
import { getParameterFromQuery } from '../utils/getParameterFromQuery';
import { categoryRepository } from '../repositories/categoryRepository';
import { CartContextProvider } from '../components/Cart/context/CartContext';
import { FloatingCart } from '../components/Cart/FloatingCart';
import { useGetCartValue } from '../components/Cart/hooks/useGetCartValue';
import { useSentry } from '../hooks/useSentry';
import { captureException } from '../core/sentry';
import Loading from '../components/Loader/Loading';
import { useGetChannels } from '../hooks/useGetChannels';
import {
  countAllChannels,
  getChannelsByFilterWithSort,
  getMaxAllowedFiltersValue,
} from '../features/channels/repository';

export type ChannelWithTagsAndFormats = Channel & {
  formats?: Format[];
  category?: Category | null;
};

const PAGE_SIZE = 50;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const searchString = getParameterFromQuery(context.query, 'search');
    const filterCategory = getParameterFromQuery(context.query, 'category');

    const sortType = getParameterFromQuery(context.query, 'sort_type');
    const sortDirection = getParameterFromQuery(context.query, 'sort_dir');

    const channels = await getChannelsByFilterWithSort({
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

    const { _count: channelsCount } = await countAllChannels();

    const { _max: allowedMax } = await getMaxAllowedFiltersValue();

    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
        ssr: {
          channels: channels,
          channelsCount: channelsCount.id,
          categories,
          filterAllowedMax: allowedMax,
        },
      },
    };
  } catch (error) {
    captureException(error);
    return {
      props: {
        ssr: {
          channels: [],
          channelsCount: 0,
          categories: [],
        },
      },
    };
  }
}

type CatalogProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Catalog = ({ ssr }: CatalogProps) => {
  const router = useRouter();
  const captureToSentry = useSentry();
  const { t } = useTranslation('common');

  const { cartValue, updateCartValue, isInCart, clearCart, subscribersCount, viewsCount } = useGetCartValue();

  const cartContextValue = useMemo(
    () => ({
      cartValue,
      updateCartValue,
      isInCart,
      clearCart,
      subscribersCount,
      viewsCount,
    }),
    [cartValue, clearCart, isInCart, subscribersCount, updateCartValue, viewsCount],
  );

  const getKey: SWRInfiniteKeyLoader = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;

      const searchParams = new URLSearchParams(router.query as Record<string, string>);
      searchParams.set('limit', PAGE_SIZE.toFixed());

      if (pageIndex) {
        searchParams.set('page', String(pageIndex));
      }

      return `/api/channels/getChannels?${searchParams.toString()}`;
    },
    [router],
  );

  const { data, size, setSize, error, isLoading } = useGetChannels(getKey);

  if (error) {
    captureToSentry(error);
  }

  const channels = data?.map((chunk) => chunk).flat() ?? ssr.channels;

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const loadMore = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  return (
    <CartContextProvider value={cartContextValue}>
      <Head>
        <title>{t('catalog.title')} - Telegads</title>
      </Head>
      <Layout>
        <Filter
          categories={ssr.categories}
          maxSubscribers={ssr.filterAllowedMax?.subscribers || 0}
          maxViews={ssr.filterAllowedMax?.views || 0}
        />
        <div className={style.line_filter}></div>
        <div className={style.content}>
          <div className={style.content__display_no}>
            <div className={style.content__wrapper}>
              <div className={style.content__header}>
                <h1>{t('catalog.header')}</h1>
                <Counter ssrCount={ssr.channelsCount} />
              </div>
              <Sorting />
            </div>
            <div className={style.catalog_rows}>
              {isLoading ? (
                <Loading />
              ) : (
                channels.map((channel) => (
                  <ChannelRow
                    id={channel.id}
                    name={channel.name}
                    avatar={channel.avatar}
                    category={channel.category?.name}
                    description={channel.description}
                    er={channel.er}
                    malePercent={channel.malePercent}
                    subscribers={channel.subscribers}
                    views={channel.views}
                    key={channel.id}
                    url={channel.url}
                  />
                ))
              )}
            </div>
            {!isReachingEnd && !isLoading && (
              <div className={style.loadMore}>
                <Button onClick={loadMore} variant="primary">
                  {t('catalog.loadmore')}
                </Button>
              </div>
            )}
          </div>
        </div>
        <FloatingCart />
      </Layout>
    </CartContextProvider>
  );
};

export default Catalog;
