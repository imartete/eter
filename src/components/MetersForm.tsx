import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks";
import { selectMeters } from "../redux/meters/selectors";
import MeterInputGroup from "./MeteInputGroup";
import { calculateBills } from "../redux/meters/metersSlice";
import { VIEWS, setCurrentView } from "../redux/app/appSlice";

export default function MetersForm() {
  const dispatch = useAppDispatch();
  const meters = useAppSelector(selectMeters);

  function handleSubmit() {
    dispatch(calculateBills());
    dispatch(setCurrentView(VIEWS.RESULT_VIEW));
  }

  return (
    <>
      <div>
        {meters.map((meter, i) => (
          <MeterInputGroup key={"meter" + i} meterId={meter.id} />
        ))}
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
}
