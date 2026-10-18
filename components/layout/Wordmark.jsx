import { Link } from "react-router-dom";

export default function Wordmark({ light = false }) {
  return (
    <Link
      to="/"
      className={`wordmark ${light ? "wordmark-light" : ""}`}
      aria-label="Silver Springs Residency — home"
    >
      <svg viewBox="0 0 44 56" fill="none" aria-hidden="true">
        <path
          d="M22 52V9M22 37C8 36 5 27 5 22c12 0 17 7 17 15ZM22 28C34 27 39 17 39 12c-12 1-17 8-17 16ZM22 19C13 16 11 8 13 3c8 2 10 9 9 16Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 52h28M13 55h18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>
        <span className="wordmark-name">Silver Springs</span>
        <span className="wordmark-subtitle">Residency</span>
      </span>
    </Link>
  );
}
