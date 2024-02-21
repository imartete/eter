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

export default function ResultsView() {
  const dispatch = useAppDispatch();
  const bills = useAppSelector(selectCalculatedBills);

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
      <CopyButton value="'Text'">
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
      {bills?.map((item, i) => (
        <Paper key={i}>
          <Text mb="0">
            {item.id + 1} квартира: &nbsp;
            <span style={{ fontWeight: 700 }}>{item.bill} </span>
            грн.
          </Text>
        </Paper>
      ))}
    </>
  );
}
