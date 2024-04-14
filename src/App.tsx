import "./App.css";
import "@mantine/core/styles.css";
import MainLayout from "./components/MainLayout";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useEffect } from "react";
import { dynamicActivate } from "./i18n";

function App() {
  useEffect(() => {
    void dynamicActivate();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <MainLayout />
    </I18nProvider>
  );
}

export default App;
