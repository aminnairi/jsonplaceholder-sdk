import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./main";

const rootElement = document.getElementById("root");

if (!(rootElement instanceof HTMLDivElement)) {
  throw new Error("rootElement is not an HTMLDivElement");
}

createRoot(rootElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
