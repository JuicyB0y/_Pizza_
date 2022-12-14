import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../components/utils/calcTotalPrice';
import { getCartFromLS } from '../../components/utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  count: number;
  imageUrl: string;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const cartData = getCartFromLS(); //данные берутся из localStorage

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    //  addItem(state, action) {
    //    state.items.push(action.payload);
    //    state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price, 0);
    //  },
    addItem(state, action: PayloadAction<CartItem | any>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// мы прописали заготовку для селектора
export const selectCart = (state: RootState) => state.cart;
// export const selectItems = (id) => (state) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
