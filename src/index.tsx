import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
