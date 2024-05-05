import { Badge, Button, Center, Divider, Text, rem } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/typedHooks";
import { selectMeters } from "@/redux/meters/selectors";
import MeterInputGroup from "@/components/MeterInputGroup";
import { calculateBills } from "@/redux/meters/metersSlice";
import { VIEWS, setCurrentView } from "@/redux/app/appSlice";
import { BREAKING_APARTMENT } from "@/constants";
import { Trans, t } from "@lingui/macro";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export default function MetersForm() {
  const dispatch = useAppDispatch();
  const meters = useAppSelector(selectMeters);

  const isFormFilled = meters.every(
    (meter) =>
      meter.previous &&
      meter.current &&
      meter.previous.toString().length <= 6 &&
      meter.current.toString().length <= 6,
  );

  function handleSubmit() {
    try {
      dispatch(calculateBills());
    } catch (e) {
      notifications.show({
        message: t`Something went wrong`,
        color: "red",
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
      });
      return;
    }
    dispatch(setCurrentView(VIEWS.RESULT_VIEW));
    localStorage.setItem(
      "meters",
      JSON.stringify(
        meters.map((meter) => {
          return { ...meter, current: "", previous: meter.current };
        }),
      ),
    );
  }

  return (
    <>
      <Divider my="md" />
      <Text>
        <Trans>Enter previous and current meter values of each apartment</Trans>
      </Text>
      {meters.map((meter) => {
        return (
          <div key={"meter" + meter.id}>
            {meter.id === 0 && (
              <Center mb="sm">
                <Badge variant="default">
                  <Trans>Right entrance</Trans>
                </Badge>
              </Center>
            )}
            {meter.id === BREAKING_APARTMENT && (
              <Center mb="sm">
                <Badge variant="default">
                  <Trans>Left entrance</Trans>
                </Badge>
              </Center>
            )}
            <MeterInputGroup meter={meter} />
          </div>
        );
      })}
      <Button fullWidth disabled={!isFormFilled} onClick={handleSubmit}>
        <Trans>Calculate</Trans>
      </Button>
    </>
  );
}
