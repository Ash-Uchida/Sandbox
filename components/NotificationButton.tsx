"use client";

import { useEffect, useState } from "react";

export function NotificationButton() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) {
      return;
    }
    const timer = window.setTimeout(() => setMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <>
      <button
        type="button"
        onClick={() => setMessage("No new notifications.")}
        className="material-symbols-outlined p-xs rounded-full hover:bg-surface-container-low transition-colors"
        aria-label="Notifications"
      >
        notifications
      </button>
      {message ? (
        <div className="fixed bottom-lg left-1/2 z-[110] -translate-x-1/2 rounded-lg border border-outline-variant/30 bg-inverse-surface px-lg py-sm text-body-sm text-surface shadow-lg">
          {message}
        </div>
      ) : null}
    </>
  );
}
