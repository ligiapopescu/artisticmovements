import React, { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage/LandingPage";
import BackendWakingBanner from "./components/UI/BackendWakingBanner";

export default function App() {
  const [backendStatus, setBackendStatus] = useState("waking");

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/warmup/`, {
        timeout: 90000,
      })
      .then(() => {
        if (!cancelled) setBackendStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setBackendStatus("error");
      });

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
