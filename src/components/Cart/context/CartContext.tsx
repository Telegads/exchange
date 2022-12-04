import React, { createContext, FC, useContext } from 'react';

import { GetCartResult } from '../hooks/useGetCartValue';

type CartContextValueType = {
  updateCartValue: (channelId: string) => void;
  isInCart: (channelId: string) => boolean;
  cartValue: GetCartResult | undefined;
  clearCart: () => void;
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
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider: FC<{ value: CartContextValueType }> = ({ value, children }) => (
  <CartContext.Provider value={value}>{children}</CartContext.Provider>
);
