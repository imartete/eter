import { Button, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useAppDispatch } from "../hooks/typedHooks";
import { addBill } from "../redux/meters/metersSlice";
import { IconCurrencyHryvnia } from "@tabler/icons-react";
import { VIEWS, setCurrentView } from "../redux/app/appSlice";

export default function BillForm() {
  const [bill, setBill] = useState("");
  const [buttonText, setButtonText] = useState("Далі");

  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setBill(e.currentTarget.value);
  }

  function handleSubmit() {
    dispatch(addBill(parseInt(bill)));
    setButtonText("Оновити суму");
    dispatch(setCurrentView(VIEWS.METERS_FORM));
  }

  return (
    <>
      <Text mb="md">Введіть суму рахунку Львівобленерго</Text>
      <TextInput
        value={bill}
        onInput={handleChange}
        rightSection={<IconCurrencyHryvnia size={20} />}
        mb="md"
      />
      <Button fullWidth disabled={bill.length < 1} onClick={handleSubmit}>
        {buttonText}
      </Button>
    </>
  );
}
