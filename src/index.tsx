import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BookProvider } from "./context/BookContext/BookContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </React.StrictMode>
);