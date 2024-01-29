import BillForm from "./BillForm";
import MetersForm from "./MetersForm";

export default function MainLayout() {
  return (
    <>
      <h2>ETER</h2>
      <BillForm />
      <MetersForm />
    </>
  );
}
