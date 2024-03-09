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

export default function ResultsView() {
  const dispatch = useAppDispatch();
  const bills = useAppSelector(selectCalculatedBills);

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 8);
  const formattedDueDate = dueDate.toLocaleDateString("uk");

  const message = `Вітаю! Сплатіть, будь ласка, за спожиту електроенергію до ${formattedDueDate}, дякую! \n`;

  const messageToCopy = bills.reduce((accumulator, currVal) => {
    if (currVal.id === 0) {
      accumulator += `\n Правий під'їзд:`;
    }
    if (currVal.id === BREAKING_APARTMENT) accumulator += `\n Лівий під'їзд:`;
    return accumulator + `\n ${currVal.number} квартира: ${currVal.bill} грн.`;
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
          Результат
        </Text>
      </Box>
      <Text>Скопіюйте всі рахунки та повідомлення для мешканців</Text>
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
            {copied ? "Скопійовано" : "Копіювати всі"}
          </Button>
        )}
      </CopyButton>
      {bills?.map((bill) => {
        return (
          <div key={"result" + bill.id}>
            {bill.id === 0 && (
              <Center mb="sm">
                <Badge variant="default">Правий під'їзд</Badge>
              </Center>
            )}
            {bill.id === BREAKING_APARTMENT && (
              <Center mb="sm">
                <Badge variant="default">Лівий під'їзд</Badge>
              </Center>
            )}
            <Paper>
              <Flex justify={"space-between"}>
                <Text mb="0">{bill.number} квартира:</Text>
                <Text mb="0">
                  <span style={{ fontWeight: 700 }}>{bill.bill} </span> грн.
                </Text>
              </Flex>
            </Paper>
          </div>
        );
      })}
    </>
  );
}
