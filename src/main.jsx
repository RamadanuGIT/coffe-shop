import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-right" />
      </CartProvider>
    </SearchProvider>
  </StrictMode>
);
