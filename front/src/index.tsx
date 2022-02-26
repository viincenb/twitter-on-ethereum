import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { listenMetamaskEvents } from "./wallet/metamaskEvents";
import { Provider } from "react-redux";

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

listenMetamaskEvents(store.dispatch);
