import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <OrderProvider>
          <CartProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
          </CartProvider>
        </OrderProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
);
