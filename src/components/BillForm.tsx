import { Box, Button, NumberInput, Text } from "@mantine/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks";
import { addBill } from "../redux/meters/metersSlice";
import { IconCurrencyHryvnia } from "@tabler/icons-react";
import { VIEWS, setCurrentView } from "../redux/app/appSlice";
import { selectBill } from "../redux/meters/selectors";

export default function BillForm() {
  const billFromStore = useAppSelector(selectBill);
  const [bill, setBill] = useState(billFromStore);
  const [buttonText, setButtonText] = useState("Далі");

  const dispatch = useAppDispatch();

  function handleSubmit() {
    if (typeof bill === "string") throw new Error(); // TODO: error message
    dispatch(addBill(bill));
    setButtonText("Оновити суму");
    dispatch(setCurrentView(VIEWS.METERS_FORM));
  }

  return (
    <Box mb="xl">
      <Text>Введіть суму рахунку Львівобленерго</Text>
      <NumberInput
        value={bill}
        onChange={setBill}
        leftSection={<IconCurrencyHryvnia size={18} />}
        mb="md"
        hideControls
        min={0}
      />
      <Button fullWidth disabled={!bill} onClick={handleSubmit}>
        {buttonText}
      </Button>
    </Box>
  );
}
