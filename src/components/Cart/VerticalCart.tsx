import React, { useCallback } from 'react';
import { Stack, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Button } from '../Button/Button';

import { useCartContext } from './context/CartContext';

type CreateCampaingBody = { channels: { id: string }[] };

export const VerticalCart = () => {
  const { cartValue, subscribersCount } = useCartContext();

  const router = useRouter();

  const createCampaign = useCallback(() => {
    if (!cartValue?.cartItems) {
      return;
    }

    axios
      .post<any, any, CreateCampaingBody>('/api/campaign/create', {
        channels: cartValue?.cartItems.map((channel) => ({ id: channel.id })),
      })
      .then(({ data }) => {
        router.push(`/campaign/${data[0].id}`);
      });
  }, [cartValue?.cartItems, router]);

  return (
    <Stack gap={5}>
      <Row>
        <Col>Каналы</Col>
        <Col>{cartValue?.cartItems.length}</Col>
      </Row>
      <Row>
        <Col>Подписчики</Col>
        <Col>{subscribersCount?.toLocaleString('ru-RU')}</Col>
      </Row>
      <Row>
        <Col>Просмотры</Col>
        <Col>{subscribersCount?.toLocaleString('ru-RU')}</Col>
      </Row>
      <hr />
      <Row>
        <Col>Сумма</Col>
        <Col>Будет рассчитана позже</Col>
      </Row>
      <Button onClick={createCampaign} variant="primary">
        Продолжить
      </Button>
      <Row>
        <Col sm={3}>
          <Image src="/img/shield.svg" width="28" height="35" />
        </Col>
        <Col>Заказ защищен безопасной сделкой</Col>
      </Row>
    </Stack>
  );
};
