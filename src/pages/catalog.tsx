import React, { FC, useCallback } from "react";
import { ChannelRow } from "../components/Catalog/ChannelRow";
import { Sorting } from "../components/Catalog/Sorting";
import Layout from "../components/Layout";
import { Filter } from "../components/Sidebar/Filter";
import style from "../scss/catalog.module.scss";

import { Category, Channel, Format, PrismaClient } from "@prisma/client";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { Button } from "../components/Button/Button";
import { useRouter } from "next/router";
import { Counter } from "../components/Counter/Counter";
import { NextPageContext } from "next";

import { throttle } from "lodash";
import { channelRepository } from "../repositories/channelRepository";
import { getParameterFromQuery } from "../utils/getParameterFromQuery";
import { categoryRepository } from "../repositories/categoryRepository";
import { useSession } from "next-auth/react";

export type ChannelWithTagsAndFormats = Channel & {
  formats: Format[];
  category: Category;
};

const PAGE_SIZE = 50;

export async function getServerSideProps(context: NextPageContext) {
  const searchString = getParameterFromQuery(context.query, "search");
  const filterCategory = getParameterFromQuery(context.query, "category");

  const sortType = getParameterFromQuery(context.query, "sort_type");
  const sortDirection = getParameterFromQuery(context.query, "sort_dir");

  const channels = await channelRepository.getChannelsByFilterWithSort({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    filter: {
      category: filterCategory,
      search: searchString,
    },
    sort: {
      direction: sortDirection,
      type: sortType,
    },
  });
  const categories = await categoryRepository.getAllCategories();

  const channelsCount = await channelRepository.countAll();

  return {
    props: {
      ssr: { channels, channelsCount: channelsCount._count.id, categories },
    }, // will be passed to the page component as props
  };
}

const fetcher = (url: string) =>
  axios.get<ChannelWithTagsAndFormats[]>(url).then((res) => res.data);

const Catalog: FC<{
  ssr: {
    channels: ChannelWithTagsAndFormats[];
    channelsCount: number;
    categories: Category[];
  };
}> = ({ ssr }) => {
  const router = useRouter();

  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      let queryString = "";

      if (pageIndex) {
        queryString = queryString + `page=${pageIndex}&limit=${PAGE_SIZE}`;
      }

      if (router.query.sort_type) {
        queryString = queryString + `&sort_type=${router.query.sort_type}`;
      }

      if (router.query.sort_dir) {
        queryString = queryString + `&sort_dir=${router.query.sort_dir}`;
      }

      if (router.query.category) {
        queryString = queryString + `&category=${router.query.category}`;
      }
      if (router.query.search) {
        queryString = queryString + `&search=${router.query.search}`;
      }

      return `/api/getChannels?${queryString}`;
    },
    [router]
  );

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const channels = data?.map((chunk) => chunk).flat() ?? ssr.channels;

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const loadMore = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  const { data: session, status } = useSession();

  return (
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
                <ChannelRow {...channel} key={channel.id} />
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
          {/* <Basket /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
