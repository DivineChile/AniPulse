import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./components/ui/provider.jsx";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <ColorModeProvider forcedTheme="dark">
        <App />
      </ColorModeProvider>
    </Provider>
  </React.StrictMode>
);
