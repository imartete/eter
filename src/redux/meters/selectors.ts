import { RootState } from "../store";

export const selectMeters = (state: RootState) => state.meters.items;
export const selectCalculatedBills = (state: RootState) =>
  state.meters.calculatedItems;
export const billsDifference = (state: RootState) =>
  state.meters.billsDifference;