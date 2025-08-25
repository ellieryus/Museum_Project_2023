import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ShopProvider } from "./pages/Shopping/ShopingContext";
import {TDProvider} from "./components/TDContext/TDContext"
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="174984122055-7bdurmnvo6ogirc0rp6cpje3v0otnt5o.apps.googleusercontent.com">
      <TDProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </TDProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
