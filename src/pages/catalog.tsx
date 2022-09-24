import React, { FC, useState } from "react";
import { Basket } from "../components/Catalog/Basket";
import { ChannelRow } from "../components/Catalog/ChannelRow";
import { Sorting } from "../components/Catalog/Sorting";
import Layout from "../components/Layout";
import { Filter } from "../components/Sidebar/Filter";
import { Navigation } from "../components/Sidebar/Navigation";
import style from "../scss/catalog.module.scss";

import {
  Category,
  Channel,
  Format,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import axios from "axios";
import useSWRInfinite from "swr/infinite";

export type ChannelWithTagsAndFormats = Channel & {
  formats: Format[];
  category: Category;
};

const PAGE_SIZE = 50;

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  const channels = await prisma.channel.findMany({
    take: PAGE_SIZE,
    include: {
      formats: true,
      category: true,
    },
  });

  const channelsCount = await prisma.channel.aggregate({
    _count: {
      id: true,
    },
  });

  return {
    props: { ssr: { channels, channelsCount: channelsCount._count.id } }, // will be passed to the page component as props
  };
}

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/api/getChannels?page=${pageIndex}&limit=${PAGE_SIZE}`;
};

const fetcher = (url: string) =>
  axios.get<ChannelWithTagsAndFormats[]>(url).then((res) => res.data);

const Catalog: FC<{
  ssr: {
    channels: ChannelWithTagsAndFormats[];
    channelsCount: number;
  };
}> = ({ ssr }) => {
  const { data, size, error, setSize } = useSWRInfinite(getKey, fetcher);
  const channels = data?.map((chunk) => chunk).flat() ?? ssr.channels;
  console.log(channels);

  const channelsCount = ssr.channelsCount;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  return (
    <Layout>
      <div className={style.line}></div>
      {/* <Navigation /> */}
      <div className={style.wrapper}>
        {/* <div className={style.line_navbar}></div> */}
        {/* <Filter /> */}
        {/* <div className={style.line_filter}></div> */}
        <div className={style.content}>
          <div className={style.content__display_no}>
            <div className={style.content__wrapper}>
              <div className={style.content__header}>
                <h1>Каталог Telegram-каналов</h1>
                <div className={style.content_channels}>
                  <p className={style.content_channels_text}>Каналы:</p>
                  <p className={style.content_channels_number}>
                    {channelsCount}
                  </p>
                </div>
              </div>
              <Sorting />
            </div>
            <div className={style.catalog_rows}>
              {channels.map((channel) => (
                <ChannelRow {...channel} key={channel.id} />
              ))}
            </div>
            {isLoadingMore && (
              <button onClick={() => setSize(size + 1)}>Load more</button>
            )}
          </div>
          {/* <Basket /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
