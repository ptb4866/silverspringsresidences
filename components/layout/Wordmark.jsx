import { Link } from "react-router-dom";

export default function Wordmark({ light = false }) {
  return (
    <Link
      to="/"
      className={`wordmark ${light ? "wordmark-light" : ""}`}
      aria-label="Silver Springs Residence — home"
    >
      <svg aria-hidden="true" viewBox="0 0 44 56" fill="none"><g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 49V23C22 13 15 7 9 5C7 15 12 21 22 25M22 34C22 24 32 17 40 16C39 27 32 31 22 34M22 42C21 33 12 27 3 27C4 36 12 40 22 42"/><path d="M15 47C7 48 7 51 22 51C37 51 37 48 29 47M9 46C-5 50 4 55 22 55C40 55 49 50 35 46"/></g></svg>
      <span>
        <span className="wordmark-name">Silver Springs</span>
        <span className="wordmark-subtitle">Residence</span>
      </span>
    </Link>
  );
}
