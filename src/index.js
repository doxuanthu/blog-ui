import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import GlobalStyle from "./components/globalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </Provider>
  </React.StrictMode>
);
