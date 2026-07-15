"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import { assertReadableContractFile } from "@/lib/contract-upload";

function nameFromFileName(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const base = dot >= 0 ? fileName.slice(0, dot) : fileName;
  return base.replace(/[-_]+/g, " ").trim();
}

export default function UploadContractButton() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setClientId("");
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function closeModal() {
    if (submitting) {
      return;
    }
    setOpen(false);
    resetForm();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setError(null);

    if (!selected) {
      setFile(null);
      return;
    }

    try {
      assertReadableContractFile(selected);
      setFile(selected);
      if (!name.trim()) {
        setName(nameFromFileName(selected.name));
      }
    } catch (err) {
      setFile(null);
      setError(err instanceof Error ? err.message : "Invalid file.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError("Choose a contract file (.txt or .md) to upload.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("clientId", clientId);
      formData.append("file", file);

      const response = await fetch("/api/contracts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed.");
      }

      closeModal();
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

      <Modal open={open} onClose={closeModal} title="Upload New Contract" wide>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-on-surface dark:text-surface-bright">
              Contract file
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.text,text/plain,text/markdown"
              required
              onChange={handleFileChange}
              className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm text-on-surface file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-on-primary dark:bg-white/5 dark:text-surface-bright"
            />
            <span className="text-body-sm text-on-surface-variant dark:text-surface-variant">
              Plain text from Gemini or any editor — .txt or .md, up to 500 KB.
            </span>
          </label>

          {file ? (
            <p className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-3 py-2 text-sm text-on-surface-variant dark:border-outline-variant/40 dark:bg-surface-container-low dark:text-surface-variant">
              Selected: <strong className="text-on-surface dark:text-surface-bright">{file.name}</strong>{" "}
              ({Math.max(1, Math.round(file.size / 1024))} KB)
            </p>
          ) : null}

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-on-surface dark:text-surface-bright">
              Document name
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Master Service Agreement - Acme Corp"
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
              placeholder="C-1001"
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
              onClick={closeModal}
              className="rounded-lg border border-outline-variant px-md py-sm font-label-md text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !file}
              className="rounded-lg bg-primary px-md py-sm font-label-md text-on-primary disabled:opacity-60"
            >
              {submitting ? "Uploading…" : "Upload contract"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
