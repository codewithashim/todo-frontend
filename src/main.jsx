import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Styles/index.scss";
import UserContext from "./Context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <UserContext>
      <App />
    </UserContext>
  </QueryClientProvider>
  </React.StrictMode>
);
