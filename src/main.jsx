import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./modules/LanguageContext.jsx";
import { PageDataProvider } from "./modules/PageDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <PageDataProvider>
      <App />
      </PageDataProvider>
    </LanguageProvider>
  </StrictMode>
);
