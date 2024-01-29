import { configureStore } from "@reduxjs/toolkit";
import { metersReducer } from "./meters/metersSlice";

export const store = configureStore({
  reducer: {
    meters: metersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
