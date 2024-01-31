import { configureStore } from "@reduxjs/toolkit";
import { metersReducer } from "./meters/metersSlice";
import { appReducer } from "./app/appSlice";

export const store = configureStore({
  reducer: {
    meters: metersReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
