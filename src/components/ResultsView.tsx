import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks";
import { selectCalculatedBills } from "../redux/meters/selectors";
import { VIEWS, setCurrentView } from "../redux/app/appSlice";

export default function ResultsView() {
  const dispatch = useAppDispatch();
  const bills = useAppSelector(selectCalculatedBills);

  function handleBack() {
    dispatch(setCurrentView(VIEWS.BILL_FORM));
  }

  return (
    <>
      <Button onClick={handleBack}>Back</Button>
      <div>{bills?.map((item, i) => <p key={i}>{item.bill}</p>)}</div>
    </>
  );
}
