import { Channel } from '@prisma/client';
import React, { createContext, FC, useContext } from 'react';

import { GetCartResult } from '../hooks/useGetCartValue';

type CartContextValueType = {
  updateCartValue: (newChannel: Channel) => void;
  isInCart: (channelId: Channel['id']) => boolean;
  cartValue: GetCartResult | undefined;
};

export const CartContext = createContext<CartContextValueType>({
  cartValue: {
    cartItems: [],
    id: '',
    userId: '',
  },
  updateCartValue: () => {},
  isInCart: () => false,
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ value: CartContextValueType }> = ({ value, children }) => (
  <CartContext.Provider value={value}>{children}</CartContext.Provider>
);
