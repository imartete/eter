import { Center, NumberInput, Paper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDialpadFilled, IconHistory } from "@tabler/icons-react";
import { useAppDispatch } from "../hooks/typedHooks";
import { addMeters } from "../redux/meters/metersSlice";
import { meterData } from "../types";

export default function MeterInputGroup({ meter }: { meter: meterData }) {
  const dispatch = useAppDispatch();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { previous: meter.previous, current: meter.current },

    validate: {
      previous: (value: string | number) =>
        value.toString().length > 6
          ? "Показниики повинні містити 6 символів"
          : null,
      current: (value: string | number) =>
        value.toString().length > 6
          ? "Показниики повинні містити 6 символів"
          : null,
    },
  });

  return (
    <>
      <Paper>
        <Center>
          <Text my="sm" fw={700}>
            {meter.number} квартира
          </Text>
        </Center>
        <form
          onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
            dispatch(
              addMeters({
                meterId: meter.id,
                meterName: e.target.id,
                meterValue: parseInt(e.target.value as string),
              }),
            );
          }}
        >
          <NumberInput
            id="previous"
            label="Попередні"
            {...form.getInputProps("previous")}
            leftSection={<IconHistory size={18} />}
            mb="md"
            hideControls
            min={0}
            style={{ position: "relative" }}
          />
          <NumberInput
            id="current"
            label="Теперішні"
            {...form.getInputProps("current")}
            leftSection={<IconDialpadFilled size={18} />}
            mb="md"
            hideControls
            min={0}
          />
        </form>
      </Paper>
    </>
  );
}
