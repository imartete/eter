import { RootState } from "@/redux/store";

export const selectMeters = (state: RootState) => state.meters.items;
export const selectBill = (state: RootState) => state.meters.bill;
export const selectCalculatedBills = (state: RootState) =>
  state.meters.calculatedItems;
export const billsDifference = (state: RootState) =>
  state.meters.billsDifference;
