import React, { FC } from "react";
import { Basket } from "../components/Catalog/Basket";
import { CatalogRow } from "../components/Catalog/CatalogRow";
import { Sorting } from "../components/Catalog/Sorting";
import Layout from "../components/Layout";
import { Filter } from "../components/Sidebar/Filter";
import { Navigation } from "../components/Sidebar/Navigation";
import style from "../scss/catalog.module.scss";

import { Channel, Format, PrismaClient, Tag } from "@prisma/client";

export type ChannelWithTagsAndFormats = Channel & {
  formats: Format[];
  tags: Tag[];
};

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  const channels = await prisma.channel.findMany({
    take: 50,
    include: {
      formats: true,
      tags: true,
    },
  });

  console.log(channels);

  return {
    props: { channels }, // will be passed to the page component as props
  };
}

const Catalog: FC<{ channels: ChannelWithTagsAndFormats[] }> = ({ channels }) => {
  return (
    <Layout>
      <div className={style.line}></div>
      <Navigation />
      <div className={style.wrapper}>
        <div className={style.line_navbar}></div>
        <Filter />
        <div className={style.line_filter}></div>
        <div className={style.content}>
          <div className={style.content__display_no}>
            <div className={style.content__wrapper}>
              <div className={style.content__header}>
                <h1>Каталог Telegram-каналов</h1>
                <div className={style.content_channels}>
                  <p className={style.content_channels_text}>Каналы:</p>
                  <p className={style.content_channels_number}>4 101</p>
                </div>
              </div>
              <Sorting />
            </div>
            <div className={style.catalog_rows}>
              {channels.map((channel) => (
                <CatalogRow {...channel} key={channel.id} />
              ))}
            </div>
          </div>
          <Basket />
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
