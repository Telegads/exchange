import { Channel } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { useSentry } from '../../../hooks/useSentry';
import { cartRepository, UpdateCartArg } from '../../../repositories/cartRepository';
import { useUserNotification } from '../../../hooks/useUserNotification';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export type GetCartResult = Awaited<ReturnType<typeof cartRepository.getCart>>;
type UpdateCartResult = Awaited<ReturnType<typeof cartRepository.updateCart>>;

export const useGetCartValue = () => {
  const { data, mutate } = useSWR<GetCartResult>('/api/cart/getCart', fetcher);
  const { data: session } = useSession();
  const captureToSentry = useSentry();
  const { notify } = useUserNotification();
  const { t } = useTranslation('common');

  const isInCart = useCallback(
    (channelId: Channel['id']) =>
      data ? Boolean(data.cartItems.find((cartLine) => cartLine.id === channelId)) : false,
    [data],
  );

  const updateCartValue = useCallback(
    (channelId: string) => {
      let newCartValue: (Channel | { id: string })[] = [];

      if (data?.cartItems && data.cartItems.find((cartLine) => cartLine.id === channelId)) {
        newCartValue = data?.cartItems.filter((cartLine) => cartLine.id !== channelId);
      } else if (data?.cartItems) {
        newCartValue = [...data.cartItems, { id: channelId }];
      } else {
        newCartValue = [{ id: channelId }];
      }

      if (!session) {
        notify(t('cart.onAddToCartChannelErrorMessage'), 'error');
        return;
      }

      axios
        .post<UpdateCartResult, any, { channels: UpdateCartArg['channelIds'] }>('/api/cart/updateCart', {
          channels: newCartValue.map((ch) => ({ id: ch.id })),
        })
        .then(() => mutate())
        .catch((error) => {
          captureToSentry(error);
        });
    },
    [captureToSentry, data?.cartItems, mutate, notify, session, t],
  );

  const clearCart = useCallback(() => {
    axios
      .post<UpdateCartResult, any, { channels: UpdateCartArg['channelIds'] }>('/api/cart/updateCart', {
        channels: [],
      })
      .then(() => mutate())
      .catch((error) => {
        captureToSentry(error);
      });
  }, [captureToSentry, mutate]);

  return {
    cartValue: data,
    updateCartValue,
    isInCart,
    clearCart,
  };
};
