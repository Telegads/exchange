import React, { FC, useCallback, useMemo } from 'react';
import { Portal } from 'react-portal';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import { Button } from '../Button/Button';
import { useSentry } from '../../hooks/useSentry';

import { useCartContext } from './context/CartContext';
import style from './Cart.module.scss';

export const FloatingCart: FC = () => {
  const { cartValue, clearCart, subscribersCount, viewsCount } = useCartContext();
  const captureToSentry = useSentry();

  const channelsCount = useMemo(() => cartValue?.cartItems?.length || 0, [cartValue?.cartItems?.length]);

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
                  <p className={style.basket__number}>{subscribersCount?.toLocaleString('ru-RU')}</p>
                </div>
                <div className={style.stats}>
                  <p className={style.basket__subtitle}>Просмотры:</p>
                  <p className={style.basket__number}>{viewsCount?.toLocaleString('ru-RU')}</p>
                </div>
              </Stack>
            </Col>
            <Col xs lg="6">
              <Stack direction="horizontal" gap={3}>
                <Button href="/campaign/check" variant="primary">
                  Оформить кампанию
                </Button>
                <Button onClick={handleClearCartButtonClick} variant="outline-primary">
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
