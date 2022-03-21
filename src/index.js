import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import axios from "axios";

import { Provider } from "react-redux";
import store from "./store/provider";

//spinner
import {
  OPEN_SPINNER_PROGRESS,
  CLOSE_SPINNER_PROGRESS,
} from "./store/spinner/types";

import { baseURL } from "./util/serverPath";
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (req) => {
    store.dispatch({ type: OPEN_SPINNER_PROGRESS });
    // Real Admin
    return req;
  },
  (error) => {
    console.log("jar"+error);
  }
);

axios.interceptors.response.use(
  (res) => {
    store.dispatch({ type: CLOSE_SPINNER_PROGRESS });
    return res;
  },
  (err) => {
    if (err.message === "Network Error") {
      // store.dispatch({ type: SET_NETWORK_ERROR });
    }
    store.dispatch({ type: CLOSE_SPINNER_PROGRESS });
    return Promise.reject(err);
  }
);

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
