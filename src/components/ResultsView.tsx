import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  CopyButton,
  Flex,
  Paper,
  Text,
  rem,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/typedHooks";
import { selectCalculatedBills } from "../redux/meters/selectors";
import { VIEWS, setCurrentView } from "../redux/app/appSlice";
import { IconArrowLeft, IconCheck, IconCopy } from "@tabler/icons-react";
import { BREAKING_APARTMENT } from "../constants";
import { Trans, t } from "@lingui/macro";

export default function ResultsView() {
  const dispatch = useAppDispatch();
  const bills = useAppSelector(selectCalculatedBills);

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 8);
  const formattedDueDate = dueDate.toLocaleDateString("uk");

  const message = t`Hello everyone! Please send your payment for electricity used the previous month until ${formattedDueDate}, thanks!`;

  const messageToCopy = bills.reduce((accumulator, currVal) => {
    if (currVal.id === 0) {
      accumulator += "\n" + t`Right entrance:`;
    }
    if (currVal.id === BREAKING_APARTMENT)
      accumulator += "\n" + t`Left entrance: `;
    const { number, bill } = currVal;
    return accumulator + "\n" + t`Apt. ${number} - ${bill} UAH`;
  }, message);

  function handleBack() {
    dispatch(setCurrentView(VIEWS.BILL_FORM));
  }

  return (
    <>
      <Box style={{ position: "relative" }}>
        <ActionIcon
          style={{ position: "absolute" }}
          variant="default"
          onClick={handleBack}
        >
          <IconArrowLeft style={{ width: rem(20), height: rem(20) }} />
        </ActionIcon>
        <Text size="lg" fw={700} mb="lg">
          <Trans>Result</Trans>
        </Text>
      </Box>
      <Text>
        <Trans>
          Copy a message for the residents with payment amounts for each of them
        </Trans>
      </Text>
      <CopyButton value={messageToCopy}>
        {({ copied, copy }) => (
          <Button
            fullWidth
            color={copied ? "teal" : "blue"}
            onClick={copy}
            mb="md"
            leftSection={
              copied ? (
                <IconCheck style={{ width: rem(20), height: rem(20) }} />
              ) : (
                <IconCopy style={{ width: rem(20), height: rem(20) }} />
              )
            }
          >
            {copied ? t`Copied` : t`Copy all`}
          </Button>
        )}
      </CopyButton>
      {bills?.map((bill) => {
        return (
          <div key={"result" + bill.id}>
            {bill.id === 0 && (
              <Center mb="sm">
                <Badge variant="default">
                  <Trans>Right entrance</Trans>
                </Badge>
              </Center>
            )}
            {bill.id === BREAKING_APARTMENT && (
              <Center mb="sm">
                <Badge variant="default">
                  <Trans>Left entrance</Trans>
                </Badge>
              </Center>
            )}
            <Paper>
              <Flex justify={"space-between"}>
                <Text mb="0">
                  <Trans>Apartment {bill.number}</Trans>:
                </Text>
                <Text mb="0">
                  <span style={{ fontWeight: 700 }}>{bill.bill} </span>
                  <Trans>UAH</Trans>
                </Text>
              </Flex>
            </Paper>
          </div>
        );
      })}
    </>
  );
}
