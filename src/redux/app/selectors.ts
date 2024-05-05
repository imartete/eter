import { RootState } from "@/redux/store";

export const selectCurrentView = (state: RootState) => state.app.currentView;
