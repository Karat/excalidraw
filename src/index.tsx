import { StrictMode, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import ExcalidrawApp from "../excalidraw-app";
import { registerSW } from "virtual:pwa-register";

import "../excalidraw-app/sentry";
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from "./types";
import { ExcalidrawElement } from "./element/types";
window.__EXCALIDRAW_SHA__ = import.meta.env.VITE_APP_GIT_SHA;
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
registerSW();

function App() {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const excalidrawAPIRefCallback = useCallback(
    (value: ExcalidrawImperativeAPI) => setExcalidrawAPI(value),
    [],
  );

  const onChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles,
  ) => {
    // eslint-disable-next-line no-console
    console.log({ excalidrawAPI, elements, appState, files });
  };

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
        theme="dark"
        excalidrawAPIRefCallback={excalidrawAPIRefCallback}
        onChange={onChange}
      />
    </StrictMode>
  );
}

root.render(<App />);
