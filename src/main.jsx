import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { NetworkBanner } from "react-network-banner";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <NetworkBanner />
        <StrictMode>
          <App />
          <ToastContainer position="top-right" />
        </StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
