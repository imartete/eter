import { Button, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks";
import { selectMeters } from "../redux/meters/selectors";
import MeterInputGroup from "./MeterInputGroup";
import { calculateBills } from "../redux/meters/metersSlice";
import { VIEWS, setCurrentView } from "../redux/app/appSlice";

export default function MetersForm() {
  const dispatch = useAppDispatch();
  const meters = useAppSelector(selectMeters);

  const isFormFilled = meters.every(
    (meter) =>
      meter.previous &&
      meter.current &&
      meter.previous.toString().length <= 6 &&
      meter.current.toString().length <= 6,
  );

  function handleSubmit() {
    dispatch(calculateBills());
    dispatch(setCurrentView(VIEWS.RESULT_VIEW));
  }

  return (
    <>
      <Text>
        Введіть попередні та поточні значення лічильників для кожної квартири
      </Text>
      {meters.map((meter, i) => (
        <MeterInputGroup key={"meter" + i} meter={meter} />
      ))}
      <Button fullWidth disabled={!isFormFilled} onClick={handleSubmit}>
        Обчислити
      </Button>
    </>
  );
}
