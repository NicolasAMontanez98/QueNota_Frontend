import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyDNcMaPCuvYxe1wCqwtvZTaqY1jo-x8uns",
  authDomain: "quenota-13c33.firebaseapp.com",
  databaseURL: "https://quenota-13c33.firebaseio.com",
  projectId: "quenota-13c33",
  storageBucket: "quenota-13c33.appspot.com",
  messagingSenderId: "110773307253",
  appId: "1:110773307253:web:9481ac79af23e709d8f53c",
  measurementId: "G-YMXMNQD5RV",
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
