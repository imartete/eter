import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { MantineProvider } from "@mantine/core";

/* const theme = createTheme({}); */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="dark"
      /* theme={{
        components: {
          Flex: {
            defaultProps: { gap: "md", direction: "column" },
          },

          Button: {
            defaultProps: { color: "indigo", size: "md" },
          },
          NumberInput: {
            defaultProps: { size: "xs", variant: "filled" },
          },
        },
        // colorScheme: "dark",
        defaultGradient: { deg: 65, from: "indigo", to: "#A5D8FF" },
      }}
      withGlobalStyles
      withNormalizeCSS */
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
