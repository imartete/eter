import { Button, Text } from "@mantine/core";
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
      <Text>
        Введіть попередні та поточні значення лічильників для кожної квартири
      </Text>
      {meters.map((meter, i) => (
        <MeterInputGroup key={"meter" + i} meterId={meter.id} />
      ))}
      <Button fullWidth onClick={handleSubmit}>
        Обчислити
      </Button>
    </>
  );
}
