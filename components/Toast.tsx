"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  durationMs?: number;
};

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return {
    toast,
    showToast: setToast,
  };
}

export function Toast({ message }: Props) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-lg left-1/2 z-[110] -translate-x-1/2 rounded-lg border border-outline-variant/30 bg-inverse-surface px-lg py-sm text-body-sm text-surface shadow-lg">
      {message}
    </div>
  );
}

type ActionFeedbackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  feedback: string;
};

export function ActionFeedbackButton({
  feedback,
  onClick,
  children,
  ...props
}: ActionFeedbackButtonProps) {
  const { toast, showToast } = useToast();

  return (
    <>
      <button
        type="button"
        {...props}
        onClick={(event) => {
          showToast(feedback);
          onClick?.(event);
        }}
      >
        {children}
      </button>
      <Toast message={toast ?? ""} />
    </>
  );
}
