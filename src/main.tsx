import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          breakpoints: {
            xs: "680",
            sm: "980",
            md: "1300",
            lg: "1620",
            xl: "1940",
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
