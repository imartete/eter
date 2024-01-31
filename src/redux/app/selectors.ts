import { RootState } from "../store";

export const selectCurrentView = (state: RootState) => state.app.currentView;
