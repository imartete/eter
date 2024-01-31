import { AppShell, Center, Text, rem } from "@mantine/core";
import BillForm from "./BillForm";
import MetersForm from "./MetersForm";
import { VIEWS } from "../redux/app/appSlice";
import { useAppSelector } from "../hooks/typedHooks";
import { selectCurrentView } from "../redux/app/selectors";
import ResultsView from "./ResultsView";

export default function MainLayout() {
  const currentView = useAppSelector(selectCurrentView);

  return (
    <>
      <AppShell padding="xl">
        <AppShell.Header withBorder>
          <Center>
            <Text size="md" fw={700} my="xs">
              ETER
            </Text>
          </Center>
        </AppShell.Header>
        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
          {(currentView === VIEWS.BILL_FORM ||
            currentView === VIEWS.METERS_FORM) && <BillForm />}
          {currentView === VIEWS.METERS_FORM && <MetersForm />}
          {currentView === VIEWS.RESULT_VIEW && <ResultsView />}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
