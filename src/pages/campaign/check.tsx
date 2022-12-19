import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React, { useMemo } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { Button } from '../../components/Button/Button';
import { CartContextProvider } from '../../components/Cart/context/CartContext';
import { useGetCartValue } from '../../components/Cart/hooks/useGetCartValue';
import { VerticalCart } from '../../components/Cart/VerticalCart';
import { ChannelRow } from '../../components/ChannelRow/ChannelRow';
import Layout from '../../components/Layout/Layout';
import { Progress } from '../../components/Progress/Progress';
import { options } from '../api/auth/[...nextauth]';
import style from '../../scss/check.module.scss';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, options);

  if (!session?.user?.id) {
    return {
      redirect: {
        destination: '/catalog',
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['campaign', 'common'])),
    },
  };
};

const Check = () => {
  const { cartValue, updateCartValue, isInCart, clearCart, subscribersCount, viewsCount } = useGetCartValue();

  const { t } = useTranslation('campaign');

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

  return (
    <Layout>
      <CartContextProvider value={cartContextValue}>
        <div>
          <Progress position={33} />
          <Row className={style.row}>
            <Col md={9} className={style.cartItems}>
              <p className={style.steps}>{t('check.step')}</p>
              <div className={style.headWrapper}>
                <div className={style.titleEditContainer}>
                  <h1 className={style.title}>{t('check.header')}</h1>
                  <button className={style.editButton}>
                    <img className={style.editIcon} src="/img/icons/edit.svg" alt="edit" />
                  </button>
                </div>
                <div className={style.draft}>Черновик</div>
                <Button className={style.addChannelButton} href="/catalog" variant="outline-primary">
                  {t('check.addChannelsButton')}
                  <img src="/img/icons/plus.svg" alt="add channel" />
                </Button>
              </div>

              <Stack gap={3}>
                {cartValue?.cartItems.map((cartItem) => (
                  <ChannelRow
                    id={cartItem.id}
                    name={cartItem.name}
                    avatar={cartItem.avatar}
                    category={cartItem.category?.name}
                    description={cartItem.description}
                    er={cartItem.er}
                    subscribers={cartItem.subscribers}
                    malePercent={cartItem.malePercent}
                    views={cartItem.views}
                    key={cartItem.id}
                  />
                ))}
              </Stack>
            </Col>
            <Col className={style.cartColumn}>
              <div className={style.stickyCart}>
                <VerticalCart />
              </div>
            </Col>
          </Row>
        </div>
      </CartContextProvider>
    </Layout>
  );
};

export default Check;
