import React, { FC, useCallback, useMemo } from 'react';
import { Portal } from 'react-portal';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import { Button } from '../Button/Button';
import { useSentry } from '../../hooks/useSentry';

import { useCartContext } from './context/CartContext';
import style from './Cart.module.scss';

export const Cart: FC = () => {
  const { cartValue, clearCart } = useCartContext();
  const captureToSentry = useSentry();

  const channelsCount = useMemo(() => cartValue?.cartItems?.length || 0, [cartValue?.cartItems?.length]);
  const channelsSubscribersCount = useMemo(
    () => cartValue?.cartItems?.reduce((prev, cur) => prev + (cur.subscribers || 0), 0),
    [cartValue],
  );
  const channelsViewsCount = useMemo(
    () => cartValue?.cartItems?.reduce((prev, cur) => prev + (cur.views || 0), 0),
    [cartValue],
  );

  const handleDownloadListButtonClick = useCallback(async () => {
    try {
      const response = await axios.get('/api/cart/downloadCart');

      fileDownload(response.data, `cart-${new Date(Date.now()).toISOString()}.csv`);
    } catch (error) {
      captureToSentry(error);
    }
  }, [captureToSentry]);

  const handleClearCartButtonClick = useCallback(async () => {
    try {
      clearCart();
    } catch (error) {
      captureToSentry(error);
    }
  }, [captureToSentry, clearCart]);

  if (channelsCount === 0) {
    return null;
  }

  return (
    <Portal>
      <div className={style.content__basket}>
        <Container>
          <Row>
            <Col>
              <Stack direction="horizontal" gap={5}>
                <div className={style.stats}>
                  <p className={style.basket__subtitle}>Выбрано каналов:</p>
                  <p className={style.basket__number}>{channelsCount}</p>
                </div>

                <div className={style.stats}>
                  <p className={style.basket__subtitle}>Подписчики:</p>
                  <p className={style.basket__number}>{channelsSubscribersCount?.toLocaleString('ru-RU')}</p>
                </div>
                <div className={style.stats}>
                  <p className={style.basket__subtitle}>Просмотры:</p>
                  <p className={style.basket__number}>{channelsViewsCount?.toLocaleString('ru-RU')}</p>
                </div>
              </Stack>
            </Col>
            <Col xs lg="6">
              <Stack direction="horizontal" gap={3}>
                <Button onClick={handleDownloadListButtonClick} type="primary">
                  Скачать корзину в csv
                </Button>
                <Button onClick={handleClearCartButtonClick} type="inverted">
                  Очистить корзину
                </Button>
              </Stack>
            </Col>
          </Row>
        </Container>
      </div>
    </Portal>
  );
};
