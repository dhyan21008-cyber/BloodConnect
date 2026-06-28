import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            background: "#ffffff",
            color: "#1f2937",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          },

          success: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <App />

    </BrowserRouter>
  </React.StrictMode>
);