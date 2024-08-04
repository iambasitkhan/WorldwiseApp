import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CitiesProvider>
      <App />
    </CitiesProvider>
  </React.StrictMode>
);
