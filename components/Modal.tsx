"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  wide?: boolean;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  wide = false,
  children,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const titleId = "briefcase-modal-title";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 w-full shrink-0 rounded-xl border border-outline-variant/40 bg-white p-6 shadow-2xl dark:border-outline-variant dark:bg-inverse-surface ${
          wide ? "max-w-[36rem]" : "max-w-[32rem]"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3
            id={titleId}
            className="text-lg font-semibold text-on-surface dark:text-surface-bright"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="material-symbols-outlined rounded-full p-1 text-on-surface-variant hover:bg-surface-container-low dark:text-surface-variant dark:hover:bg-white/10"
            aria-label="Close dialog"
          >
            close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
