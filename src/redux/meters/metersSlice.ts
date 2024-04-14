import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { meterCalculatedData, meterData } from "../../types";
import { BREAKING_APARTMENT, TARIF, METERS_AMOUNT } from "../../constants";

interface MetersState {
  items: meterData[];
  calculatedItems: meterCalculatedData[];
  bill: number | string;
  billsDifference: number;
}

const savedMeters = localStorage.getItem("meters");

let number = 1;
const initialMeters = Array.from(new Array(METERS_AMOUNT)).map((_, i) => {
  if (i === BREAKING_APARTMENT) {
    number = 1;
    return { id: i, number: number++, previous: "", current: "" };
  }
  return { id: i, number: number++, previous: "", current: "" };
});

const initialState: MetersState = {
  items: savedMeters ? (JSON.parse(savedMeters) as meterData[]) : initialMeters,
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
          throw new Error(
            "Meter value is string type, while it should be number",
          );
        return {
          id: item.id,
          number: item.number,
          bill: (item.current - item.previous) * TARIF,
        };
      });

      const differencesSum = dirrefenceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue.bill,
        0,
      );

      if (typeof state.bill === "string")
        throw new Error("Bill is string type, while it should be number");
      const billsDifference = (state.bill - differencesSum) / METERS_AMOUNT;

      state.billsDifference = billsDifference;

      const finalBillsArray = dirrefenceArray.map((item) => {
        const bill = item.bill + billsDifference;
        return { id: item.id, number: item.number, bill: Math.ceil(bill) };
      });

      state.calculatedItems = finalBillsArray;
    },
  },
});

export const { addMeters, calculateBills, addBill } = metersSlice.actions;
export const metersReducer = metersSlice.reducer;
