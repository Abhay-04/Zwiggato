import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: [] };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(), // Load initial state from localStorage
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.card.info.id === item.card.info.id
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...item, count: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },

    removeItem: (state, action) => {
      const itemId = action.payload.id;
      const existingItem = state.items.find(
        (item) => item.card.info.id === itemId
      );

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.card.info.id !== itemId
          );
        }
      }

      localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },

    removeEntireItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.card.info.id !== action.payload.id
      );

      localStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart"); // Clear localStorage
    },
  },
});

export const { addItem, removeItem, removeEntireItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
