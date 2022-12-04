import React, { useCallback, useMemo } from 'react';
import { Category, Channel, Format } from '@prisma/client';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

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
import { useSentry } from '../hooks/useSentry';
import { captureException } from '../core/sentry';
import { useGetChannels } from '../hooks/useGetChannels';
import Loading from '../components/Loader/Loading';

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

    const { _max: allowedMax } = await channelRepository.getMaxAllowedFiltersValue();

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
export type FetchChannelsByFilterResult = ReturnType<typeof channelRepository.getChannelsByFilterWithSort>;

const Catalog = ({ ssr }: CatalogProps) => {
  const router = useRouter();
  const captureToSentry = useSentry();
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  const { cartValue, updateCartValue, isInCart, clearCart } = useGetCartValue();

  const cartContextValue = useMemo(
    () => ({
      cartValue,
      updateCartValue,
      isInCart,
      clearCart,
    }),
    [cartValue, clearCart, isInCart, updateCartValue],
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
      <Layout session={session}>
        <div className={style.line}></div>
        {/* <Navigation /> */}
        <div className={style.wrapper}>
          {/* <div className={style.line_navbar}></div> */}
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
                    />
                  ))
                )}
              </div>
              {!isReachingEnd && !isLoading && (
                <div className={style.loadMore}>
                  <Button onClick={loadMore} type="primary">
                    {t('catalog.loadmore')}
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
