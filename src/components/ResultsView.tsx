import {
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Paper,
  Text,
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

  console.log(messageToCopy);

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
          <IconArrowLeft size={18} />
        </ActionIcon>
        <Text size="lg" fw={700} mb="xl">
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
              copied ? <IconCheck size={18} /> : <IconCopy size={18} />
            }
          >
            {copied ? "Скопійовано" : "Копіювати всі"}
          </Button>
        )}
      </CopyButton>
      {bills?.map((bill) => {
        return (
          <div key={"result" + bill.id}>
            {bill.id === 0 && <Text fw={700}>Правий під'їзд:</Text>}
            {bill.id === BREAKING_APARTMENT && (
              <Text fw={700}>Лівий під'їзд:</Text>
            )}
            <Paper>
              <Text mb="0">
                {bill.number} квартира: &nbsp;
                <span style={{ fontWeight: 700 }}>{bill.bill} </span>
                грн.
              </Text>
            </Paper>
          </div>
        );
      })}
    </>
  );
}
