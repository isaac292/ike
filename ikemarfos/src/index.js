import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <Provider store={Store}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
