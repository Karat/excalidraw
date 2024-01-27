import { StrictMode, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import ExcalidrawApp from "../excalidraw-app";
import { registerSW } from "virtual:pwa-register";

import "../excalidraw-app/sentry";
import { ExcalidrawImperativeAPI } from "./types";
window.__EXCALIDRAW_SHA__ = import.meta.env.VITE_APP_GIT_SHA;
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
registerSW();

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const excalidrawAPIRefCallback = useCallback(
    (value: ExcalidrawImperativeAPI) => setExcalidrawAPI(value),
    [],
  );

  return (
    <StrictMode>
      <ExcalidrawApp
        firebaseConfig={JSON.parse(import.meta.env.VITE_APP_FIREBASE_CONFIG)}
        collabServerUrl={import.meta.env.VITE_APP_WS_SERVER_URL}
        roomLinkData={{
          roomId: "localTestRoomId02",
          roomKey: "yx8WgrzkcceYyZFXAo4_9g", // arbitrary constant key
        }}
        username={"Karat Engineer"}
        firebaseToken="placeholder"
        theme="dark"
        excalidrawAPIRefCallback={excalidrawAPIRefCallback}
        isInterview={true}
        studioReference={"1"}
      />
    </StrictMode>
  );
}

root.render(<App />);
