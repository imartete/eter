import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks";
import { selectMeters } from "../redux/meters/selectors";
import MeterInputGroup from "./MeteInputGroup";
import ResultsView from "./ResultsView";
import { useState } from "react";
import { calculateBills } from "../redux/meters/metersSlice";

export default function MetersForm() {
  const dispatch = useAppDispatch();
  const meters = useAppSelector(selectMeters);

  const [isResultVisible, setResultVisible] = useState(false);

  function handleSubmit() {
    dispatch(calculateBills());
    setResultVisible(true);
  }

  return (
    <>
      <div>
        {meters.map((meter, i) => (
          <MeterInputGroup key={"meter" + i} meterId={meter.id} />
        ))}
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
      {isResultVisible && <ResultsView />}
    </>
  );
}
