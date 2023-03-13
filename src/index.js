import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={<p>Oops! Something went wrong.</p>}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
