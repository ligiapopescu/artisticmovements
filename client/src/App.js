import React, { useEffect } from "react";
import axios from "axios";
import LandingPage from "./pages/LandingPage/LandingPage";

export default function App() {
  useEffect(() => {
    // Fire-and-forget wake-up ping so the Render backend starts spinning
    // up as soon as the page loads. No timeout: we don't want to abort
    // during a slow cold start.
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/api/warmup/`, { timeout: 0 })
      .catch((err) => {
        console.log("warmup ping failed:", err && err.message);
      });
  }, []);

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}
