import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const storageItems = localStorage.getItem('cart');
  const items = storageItems ? JSON.parse(storageItems) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
