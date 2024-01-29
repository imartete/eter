import { useAppSelector } from "../hooks/typedHooks";
import { selectCalculatedBills } from "../redux/meters/selectors";

export default function ResultsView() {
  const bills = useAppSelector(selectCalculatedBills);

  return (
    <>
      <div>{bills?.map((item, i) => <p key={i}>{item.bill}</p>)}</div>
    </>
  );
}
