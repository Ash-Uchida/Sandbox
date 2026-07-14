"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadContractButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, clientId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed.");
      }

      setName("");
      setClientId("");
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative z-10 flex items-center gap-sm bg-primary text-on-primary px-lg py-md rounded-lg font-label-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
      >
        <span className="material-symbols-outlined">upload_file</span>
        Upload New Contract
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-contract-title"
        >
          <div className="w-full max-w-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg shadow-xl">
            <div className="mb-md flex items-center justify-between">
              <h3
                id="upload-contract-title"
                className="font-headline-sm text-headline-sm text-on-surface"
              >
                Upload New Contract
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="material-symbols-outlined rounded-full p-xs hover:bg-surface-container-low"
                aria-label="Close"
              >
                close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-md">
              <label className="block space-y-xs">
                <span className="font-label-md text-on-surface-variant">
                  Document name
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Master Service Agreement"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-md py-sm outline-none focus:border-primary"
                />
              </label>

              <label className="block space-y-xs">
                <span className="font-label-md text-on-surface-variant">
                  Client ID
                </span>
                <input
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="ACME-001"
                  className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-md py-sm outline-none focus:border-primary"
                />
              </label>

              {error ? (
                <p className="text-body-sm text-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex justify-end gap-sm pt-sm">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-outline-variant px-md py-sm font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-primary px-md py-sm font-label-md text-on-primary disabled:opacity-60"
                >
                  {submitting ? "Saving…" : "Create contract"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
