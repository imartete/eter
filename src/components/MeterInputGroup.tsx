import { Group, NumberInput, Paper, Text, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDialpadFilled, IconHistory } from "@tabler/icons-react";
import { useAppDispatch } from "@/hooks/typedHooks";
import { addMeters } from "@/redux/meters/metersSlice";
import { meterData } from "@/types";
import { Trans, msg, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export default function MeterInputGroup({ meter }: { meter: meterData }) {
  const dispatch = useAppDispatch();
  const { _ } = useLingui();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { previous: meter.previous, current: meter.current },

    validate: {
      previous: (value: string | number) =>
        value.toString().length > 6
          ? t`Value has to be not less than 6 digits`
          : null,
      current: (value: string | number) =>
        value.toString().length > 6
          ? t`Value has to be not less than 6 digits`
          : null,
    },
  });

  return (
    <>
      <Paper>
        <Text my="sm" fw={700} style={{ textAlign: "start" }}>
          <Trans>Apartment {meter.number}</Trans>
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
              label={_(msg`Previous`)}
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
              label={_(msg`Current`)}
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
