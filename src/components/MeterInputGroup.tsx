import { Group, NumberInput, Paper, Text, rem } from "@mantine/core";
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
        <Text my="sm" fw={700} style={{ textAlign: "start" }}>
          {meter.number} квартира
        </Text>
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
          <Group grow preventGrowOverflow gap="md" align="start">
            <NumberInput
              id="previous"
              label="Попередні"
              {...form.getInputProps("previous")}
              leftSection={
                <IconHistory style={{ width: rem(20), height: rem(20) }} />
              }
              mb="md"
              hideControls
              min={0}
              style={{}}
            />
            <NumberInput
              id="current"
              label="Теперішні"
              {...form.getInputProps("current")}
              leftSection={
                <IconDialpadFilled
                  style={{ width: rem(20), height: rem(20) }}
                />
              }
              mb="md"
              hideControls
              min={0}
            />
          </Group>
        </form>
      </Paper>
    </>
  );
}
