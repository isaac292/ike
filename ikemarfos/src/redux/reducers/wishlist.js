import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, builder => {
  builder
    .addCase('addToWishlist', (state, action) => {
      const item = action.payload;
      const isItemExistIndex = state.wishlist.findIndex((i) => i._id === item._id);
      if (isItemExistIndex !== -1) {
        state.wishlist[isItemExistIndex] = item;
      } else {
        state.wishlist.push(item);
      }
    })
    .addCase('removeFromWishlist', (state, action) => {
      const itemId = action.payload;
      state.wishlist = state.wishlist.filter((i) => i._id !== itemId);
    });
});
