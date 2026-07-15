import Link from "next/link";

export default function EditorEmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-md px-lg py-xl text-center">
      <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-60">
        description
      </span>
      <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
        No contract selected
      </h2>
      <p className="max-w-xl text-body-md leading-relaxed text-on-surface-variant dark:text-surface-variant">
        Open a contract from the dashboard to edit it here. Each contract has its
        own document view.
      </p>
      <Link
        href="/dashboard#recent-contracts"
        className="rounded-lg bg-primary px-lg py-md font-label-md text-on-primary"
      >
        Go to contracts
      </Link>
    </div>
  );
}
