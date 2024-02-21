import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentView: string;
}

export const VIEWS = {
  BILL_FORM: "BILL_FORM",
  METERS_FORM: "METERS_FORM",
  RESULT_VIEW: "RESULT_VIEW",
};

const initialState: AppState = {
  currentView: VIEWS.BILL_FORM,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<string>) => {
      state.currentView = action.payload;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
});

export const { setCurrentView } = appSlice.actions;
export const appReducer = appSlice.reducer;
