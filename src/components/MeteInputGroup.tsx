import { Center, Paper, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDialpadFilled, IconHistory } from "@tabler/icons-react";
import { useAppDispatch } from "../hooks/typedHooks";
import { addMeters } from "../redux/meters/metersSlice";

export default function MeterInputGroup({ meterId }: { meterId: number }) {
  const dispatch = useAppDispatch();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: { previous: "", current: "" },

    validate: {
      previous: (value: string) =>
        value.length > 6 ? "Показниики повинні містити 6 символів" : null,
      current: (value: string) =>
        value.length > 6 ? "Показниики повинні містити 6 символів" : null,
    },
  });

  return (
    <>
      <Paper>
        <Center>
          <Text my="sm" fw={700}>
            {meterId + 1} квартира
          </Text>
        </Center>
        <form
          onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
            dispatch(
              addMeters({
                meterId,
                meterName: e.target.id,
                meterValue: parseInt(e.target.value as string),
              }),
            );
          }}
        >
          <TextInput
            id="previous"
            type="number"
            label="Попередні"
            {...form.getInputProps("previous")}
            leftSection={<IconHistory size={18} />}
            mb="md"
          />
          <TextInput
            id="current"
            type="number"
            label="Теперішні"
            {...form.getInputProps("current")}
            leftSection={<IconDialpadFilled size={18} />}
            mb="md"
          />
        </form>
      </Paper>
    </>
  );
}
