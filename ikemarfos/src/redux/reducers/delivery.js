import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const deliveryReducer = createReducer(initialState, builder => {
  builder
    .addCase('LoadDeliveryRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadDeliverySuccess', (state, action) => {
      state.isDelivery = true;
      state.isLoading = false;
      state.delivery = action.payload;
    })
    .addCase('LoadDeliveryFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isDelivery = false;
    })
    .addCase('getAllDeliverysRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllDeliverysSuccess', (state, action) => {
      state.isLoading = false;
      state.deliverys = action.payload;
    })
    .addCase('getAllDeliverysFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
