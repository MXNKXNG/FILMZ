import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { QueryProvider } from "./context/QueryProvider.jsx";
import "./index.css";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryProvider>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </QueryProvider>
  // </StrictMode>
);
