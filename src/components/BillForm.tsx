import { Box, Button, NumberInput, Text, rem } from "@mantine/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/typedHooks";
import { addBill } from "@/redux/meters/metersSlice";
import { IconCheck, IconCurrencyHryvnia, IconX } from "@tabler/icons-react";
import { VIEWS, setCurrentView } from "@/redux/app/appSlice";
import { selectBill } from "@/redux/meters/selectors";
import { notifications } from "@mantine/notifications";
import { Trans, t } from "@lingui/macro";

export default function BillForm() {
  const billFromStore = useAppSelector(selectBill);
  const [bill, setBill] = useState(billFromStore);
  const [buttonText, setButtonText] = useState(t`Next`);

  const dispatch = useAppDispatch();

  function handleSubmit() {
    try {
      if (typeof bill === "string")
        throw new Error("Bill is string type, while it should be number");
      dispatch(addBill(bill));
    } catch (e) {
      notifications.show({
        message: t`Something went wrong`,
        color: "red",
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
      });
      return;
    }
    setButtonText(t`Update bill sum`);
    dispatch(setCurrentView(VIEWS.METERS_FORM));
    notifications.show({
      message: t`Bill updated`,
      color: "green",
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
      withCloseButton: false,
    });
  }

  return (
    <Box mb="xl">
      <Text>
        <Trans>Enter total bill sum</Trans>
      </Text>
      <NumberInput
        value={bill}
        onChange={setBill}
        leftSection={
          <IconCurrencyHryvnia style={{ width: rem(20), height: rem(20) }} />
        }
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
