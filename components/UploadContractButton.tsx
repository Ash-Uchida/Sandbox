"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";

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
        className="shrink-0 flex items-center gap-sm bg-primary text-on-primary px-lg py-md rounded-lg font-label-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
      >
        <span className="material-symbols-outlined">upload_file</span>
        Upload New Contract
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Upload New Contract"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-on-surface dark:text-surface-bright">
              Document name
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Master Service Agreement"
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm text-on-surface outline-none focus:border-primary placeholder:text-on-surface-variant dark:bg-white/5 dark:text-surface-bright"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-on-surface dark:text-surface-bright">
              Client ID
            </span>
            <input
              required
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="ACME-001"
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm text-on-surface outline-none focus:border-primary placeholder:text-on-surface-variant dark:bg-white/5 dark:text-surface-bright"
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
              className="rounded-lg border border-outline-variant px-md py-sm font-label-md text-on-surface"
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
      </Modal>
    </>
  );
}
