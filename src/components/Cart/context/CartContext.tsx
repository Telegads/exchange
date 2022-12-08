import React, { createContext, FC, useContext } from 'react';

import { GetCartResult } from '../hooks/useGetCartValue';

type CartContextValueType = {
  updateCartValue: (channelId: string) => void;
  isInCart: (channelId: string) => boolean;
  cartValue: GetCartResult | undefined;
  clearCart: () => void;
  subscribersCount: number | undefined;
  viewsCount: number | undefined;
};

export const CartContext = createContext<CartContextValueType>({
  cartValue: {
    cartItems: [],
    id: '',
    userId: '',
  },
  updateCartValue: () => {},
  clearCart: () => {},
  isInCart: () => false,
  subscribersCount: 0,
  viewsCount: 0,
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ value: CartContextValueType }> = ({ value, children }) => (
  <CartContext.Provider value={value}>{children}</CartContext.Provider>
);
