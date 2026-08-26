import { Spinner } from "react-bootstrap";
import "./BackendWakingBanner.css";

export default function BackendWakingBanner({ status }) {
  if (status === "ready") return null;

  const isError = status === "error";

  return (
    <div
      className={`backend-waking-banner ${
        isError ? "backend-waking-banner--error" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      {!isError && (
        <Spinner
          animation="border"
          size="sm"
          variant="light"
          className="backend-waking-banner__spinner"
        />
      )}
      <span>
        {isError
          ? "Couldn't reach the AI backend. Try refreshing in a moment."
          : "Waking up the AI backend — this can take up to 30 seconds on the first visit."}
      </span>
    </div>
  );
}
