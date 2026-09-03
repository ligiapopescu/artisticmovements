import React, { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage/LandingPage";
import BackendWakingBanner from "./components/UI/BackendWakingBanner";

const MAX_ATTEMPTS = 8;
const RETRY_DELAY_MS = 5000;

export default function App() {
  const [backendStatus, setBackendStatus] = useState("waking");

  useEffect(() => {
    let cancelled = false;

    const pingWarmup = async () => {
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        if (cancelled) return;
        try {
          await axios.get(
            `${process.env.REACT_APP_BACKEND_API}/api/warmup/`,
            { timeout: 60000 }
          );
          if (!cancelled) setBackendStatus("ready");
          return;
        } catch (err) {
          console.log(
            `warmup attempt ${attempt}/${MAX_ATTEMPTS} failed:`,
            err && err.message
          );
          if (attempt < MAX_ATTEMPTS) {
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
          }
        }
      }
      if (!cancelled) setBackendStatus("error");
    };

    pingWarmup();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="App">
      <BackendWakingBanner status={backendStatus} />
      <LandingPage backendStatus={backendStatus} />
    </div>
  );
}
