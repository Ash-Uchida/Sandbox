import type { Metadata } from "next";
import EditorToolbarActions from "@/components/EditorToolbarActions";
import EditorAssistant from "@/components/EditorAssistant";
import EditorHighlightedContent from "@/components/EditorHighlightedContent";
import EditorDocument from "@/components/EditorDocument";
import EditorEmptyState from "@/components/EditorEmptyState";
import { MobileMenuButton } from "@/components/MobileNav";
import { getActiveUser } from "@/lib/user";
import { getContract } from "@/lib/contracts";
import { getSampleDocument } from "@/lib/editor/sample-document";
import styles from "./editor.module.css";

export const metadata: Metadata = {
  title: "Document Editor | BriefcaseOS",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ contract?: string; issue?: string }>;
};

export default async function EditorPage({ searchParams }: Props) {
  const { contract: contractId, issue: issueId } = await searchParams;
  const user = await getActiveUser();
  const contract = contractId
    ? await getContract(user.id, contractId)
    : null;

  const title = contract?.name ?? "Document Editor";
  const sampleDocument = contract ? getSampleDocument(contract) : null;

  return (
    <main className="app-main flex h-screen flex-1 flex-col overflow-hidden bg-surface-bright dark:bg-background">
      <header className="sticky top-0 w-full z-40 flex justify-between items-center h-[64px] px-lg bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant dark:border-outline-variant/40 dark:bg-background/80">
        <div className="flex items-center gap-md min-w-0">
          <MobileMenuButton />
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-md">
          <EditorToolbarActions />
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-surface-container-low">
        <section
          className={`h-[55%] md:h-full md:flex-[0.6] bg-[#F7F9FC] dark:bg-background border-b md:border-b-0 md:border-r border-outline-variant overflow-y-auto ${styles.customScrollbar} p-xl`}
        >
          <div className="max-w-[800px] mx-auto bg-white dark:bg-surface-container-lowest p-6 md:p-[60px] shadow-sm border border-outline-variant/30 min-h-full">
            {!contractId ? (
              <EditorEmptyState />
            ) : !contract ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-md text-center">
                <p className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
                  Contract not found
                </p>
                <p className="text-body-md text-on-surface-variant">
                  This contract may have been removed or you may not have access.
                </p>
              </div>
            ) : contract.documentText ? (
              <EditorHighlightedContent
                title={contract.name}
                fileName={contract.fileName}
                documentText={contract.documentText}
                issueId={issueId}
              />
            ) : (
              <EditorDocument document={sampleDocument!} issueId={issueId} />
            )}
          </div>
        </section>

        {contract ? (
          <EditorAssistant
            contractId={contract.id}
            documentTitle={contract.name}
          />
        ) : (
          <section className="flex h-[45%] flex-col border-t border-outline-variant bg-inverse-surface md:h-full md:flex-[0.4] md:border-t-0 md:border-l p-lg">
            <p className="text-sm text-inverse-on-surface/60">
              Select a contract from the dashboard to use the document assistant.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
