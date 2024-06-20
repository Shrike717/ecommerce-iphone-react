import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Das ist der Code, der von Sentry SDK nach Anlage eines neuen Projekts rein kopiert wurde:
import * as Sentry from "@sentry/react";

// Das sind Konfigurationen, in der wir die Art und Weise einstellen können, wie Sentry unsere App überwacht.
Sentry.init({
  dsn: "https://288be3a7c9d948b65ac875622ecefa43@o4507463378206720.ingest.de.sentry.io/4507463542833232",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.metrics.metricsAggregatorIntegration(), // Das haben wir hinzugefügt
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect, // Auf diese Weise war es Central, das wäre Reeact benutzen und wie useEffekt funktioniert
    }), // Das haben wir hinzugefügt
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
