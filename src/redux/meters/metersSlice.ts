import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { meterCalculatedData, meterData } from "../../types";

interface MetersState {
  items: meterData[];
  calculatedItems: meterCalculatedData[];
  bill: number | string;
  billsDifference: number;
}

const METERS_AMOUNT = 13;
const TARIF = 2.64;

const initialMeters = Array.from(new Array(METERS_AMOUNT)).map((_, i) => {
  return { id: i, previous: "", current: "" };
});

const initialState: MetersState = {
  items: initialMeters,
  calculatedItems: [],
  bill: "",
  billsDifference: NaN,
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
        if (
          typeof item.current === "string" ||
          typeof item.previous === "string"
        )
          throw new Error("Received string from NumberInput"); // TODO: error message
        return {
          id: item.id,
          bill: (item.current - item.previous) * TARIF,
        };
      });

      const differencesSum = dirrefenceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue.bill,
        0,
      );

      if (typeof state.bill === "string") throw new Error(""); // TODO: error message
      const billsDifference = (state.bill - differencesSum) / METERS_AMOUNT;

      state.billsDifference = billsDifference;

      const finalBillsArray = dirrefenceArray.map((item) => {
        const bill = item.bill + billsDifference;
        return { id: item.id, bill: Math.ceil(bill) };
      });

      state.calculatedItems = finalBillsArray;
    },
  },
});

export const { addMeters, calculateBills, addBill } = metersSlice.actions;
export const metersReducer = metersSlice.reducer;
