import { configureStore } from "@reduxjs/toolkit";
import { metersReducer } from "@/redux/meters/metersSlice";
import { appReducer } from "@/redux/app/appSlice";

export const store = configureStore({
  reducer: {
    meters: metersReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
