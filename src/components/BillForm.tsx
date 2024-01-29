import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import { useAppDispatch } from "../hooks/typedHooks";
import { addBill } from "../redux/meters/metersSlice";
import { IconCheck, IconCurrencyHryvnia } from "@tabler/icons-react";

export default function BillForm() {
  const [bill, setBill] = useState("");
  const dispatch = useAppDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setBill(e.currentTarget.value);
  }

  function handleSubmit() {
    dispatch(addBill(parseInt(bill)));
  }

  return (
    <>
      <p>
        Введіть суму, яку вам виставлено в останньому рахунку, натисніть зелений
        прапорець для підтвердження
      </p>
      <Flex justify="center" gap="md">
        <TextInput
          value={bill}
          onInput={handleChange}
          rightSection={<IconCurrencyHryvnia size={20} />}
        />
        <ActionIcon
          variant="light"
          color="teal"
          size="lg"
          radius="xs"
          aria-label="Settings"
          onClick={handleSubmit}
        >
          <IconCheck size={20} />
        </ActionIcon>
      </Flex>
    </>
  );
}
