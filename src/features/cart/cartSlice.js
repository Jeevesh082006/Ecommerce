import { createSlice } from "@reduxjs/toolkit";

const DISCOUNT_PERCENT = 10;

export const getDiscountedPrice = (
  originalPrice
) => {
  return Number(
    (
      originalPrice *
      (1 - DISCOUNT_PERCENT / 100)
    ).toFixed(2)
  );
};

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const {
        product,
        quantity = 1,
      } = action.payload;

      const existingItem =
        state.items.find(
          (item) =>
            item.id === product.id
        );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          image: product.image,
          category: product.category,
          originalPrice: Number(
            product.price
          ),
          price: getDiscountedPrice(
            product.price
          ),
          quantity,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items =
        state.items.filter(
          (item) =>
            item.id !== action.payload
        );
    },

    increaseQuantity: (state, action) => {
      const item =
        state.items.find(
          (item) =>
            item.id === action.payload
        );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item =
        state.items.find(
          (item) =>
            item.id === action.payload
        );

      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items =
          state.items.filter(
            (cartItem) =>
              cartItem.id !==
              action.payload
          );
      } else {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) =>
  state.cart.items;

export const selectTotalItems = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

export const selectTotalSavings = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total +
      (item.originalPrice -
        item.price) *
        item.quantity,
    0
  );

export default cartSlice.reducer;