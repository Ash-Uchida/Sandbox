"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";

type Props = {
  contractId: string;
  contractName: string;
};

export default function DeleteContractButton({
  contractId,
  contractName,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameMatches = confirmName === contractName;

  function closeModal() {
    if (deleting) {
      return;
    }
    setOpen(false);
    setConfirmName("");
    setError(null);
  }

  async function handleDelete() {
    if (!nameMatches) {
      return;
    }

    setError(null);
    setDeleting(true);

    try {
      const response = await fetch(`/api/contracts/${contractId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Delete failed.");
      }

      closeModal();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="material-symbols-outlined inline-flex text-outline transition-colors hover:text-error"
        aria-label={`Delete ${contractName}`}
      >
        delete
      </button>

      <Modal open={open} onClose={closeModal} title="Delete contract">
        <div className="space-y-4">
          <p className="text-body-md leading-relaxed text-on-surface-variant dark:text-surface-variant">
            This action cannot be undone. The contract will be permanently
            removed from your dashboard.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-on-surface dark:text-surface-bright">
              Type the contract name to confirm
            </p>
            <div className="flex flex-col gap-sm sm:flex-row sm:items-stretch">
              <div
                className="flex min-h-[42px] flex-1 items-center rounded-lg border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm font-semibold text-on-surface dark:border-outline-variant/50 dark:bg-surface-container-high dark:text-surface-bright"
                aria-hidden="true"
              >
                {contractName}
              </div>
              <input
                value={confirmName}
                onChange={(event) => setConfirmName(event.target.value)}
                placeholder="Type contract name"
                className="min-h-[42px] flex-1 rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-error focus:ring-2 focus:ring-error/20 dark:border-outline-variant/50 dark:bg-surface-container-low dark:text-surface-bright"
                aria-label={`Type ${contractName} to confirm deletion`}
                autoComplete="off"
              />
            </div>
          </div>

          {error ? (
            <p className="text-body-sm text-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-sm">
            <button
              type="button"
              onClick={closeModal}
              disabled={deleting}
              className="rounded-lg border border-outline-variant px-md py-sm font-label-md text-on-surface disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || !nameMatches}
              className="rounded-lg bg-error px-md py-sm font-label-md text-on-error disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete contract"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
