import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { MantineProvider, createTheme, Paper, Text } from "@mantine/core";

const theme = createTheme({
  components: {
    Paper: Paper.extend({
      defaultProps: {
        shadow: "xs",
        p: "sm",
        mb: "md",
        style: { backgroundColor: "#272727" },
      },
    }),

    Text: Text.extend({
      defaultProps: { mb: "md", style: { textAlign: "center" } },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
