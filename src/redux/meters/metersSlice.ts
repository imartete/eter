import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { meterCalculatedData, meterData } from "../../types";

interface MetersState {
  items: meterData[];
  calculatedItems: meterCalculatedData[];
  bill: number;
  billsDifference: number;
}

const METERS_AMOUNT = 13;
const TARIF = 2.64;

const initialMeters = Array.from(new Array(METERS_AMOUNT)).map((_, i) => {
  return { id: i, previous: 0, current: 0 };
});

const initialState: MetersState = {
  items: initialMeters,
  calculatedItems: [],
  bill: 0,
  billsDifference: 0,
};

const metersSlice = createSlice({
  name: "meters",
  initialState,
  reducers: {
    addMeters: (
      state,
      action: PayloadAction<{
        meterId: number;
        meterName: string;
        meterValue: number;
      }>,
    ) => {
      const { meterId, meterName, meterValue } = action.payload;

      const filtered = state.items?.map((item) =>
        item.id === meterId
          ? { ...item, [meterName]: meterValue }
          : { ...item },
      );
      state.items = filtered;
    },
    addBill: (state, action: PayloadAction<number>) => {
      state.bill = action.payload;
    },
    calculateBills: (state) => {
      const dirrefenceArray = state.items.map((item) => {
        return {
          id: item.id,
          bill: (item.current - item.previous) * TARIF,
        };
      });

      const differencesSum = dirrefenceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue.bill,
        0,
      );

      const billsDifference = (state.bill - differencesSum) / METERS_AMOUNT;

      state.billsDifference = billsDifference;

      const finalBillsArray = dirrefenceArray.map((item) => {
        const bill = item.bill + billsDifference;
        return { id: item.id, bill: Math.floor(bill) };
      });

      state.calculatedItems = finalBillsArray;
    },
  },
});

export const { addMeters, calculateBills, addBill } = metersSlice.actions;
export const metersReducer = metersSlice.reducer;
