import type { Metadata } from "next";
import LibraryResources from "@/components/LibraryResources";
import { MobileMenuButton } from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Legal Library | BriefcaseOS",
};

export default function LibraryPage() {
  return (
    <main className="app-main flex h-screen flex-1 flex-col overflow-y-auto bg-surface-bright dark:bg-background">
      <header className="sticky top-0 z-40 flex h-[64px] w-full items-center justify-between border-b border-outline-variant bg-surface-bright/80 px-lg backdrop-blur-md dark:border-outline-variant/40 dark:bg-background/80">
        <div className="flex min-w-0 items-center gap-md">
          <MobileMenuButton />
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface dark:text-surface-bright">
            Legal Library
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1200px] space-y-lg p-lg lg:p-xl">
        <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="mb-1 font-display-lg text-display-lg text-on-surface dark:text-surface-bright">
            Reference materials
          </h2>
          <p className="max-w-2xl font-body-md leading-relaxed text-on-surface-variant dark:text-surface-variant">
            Curated templates and guidance. Read resources here—no redirect to the
            editor.
          </p>
        </section>

        <LibraryResources />
      </div>
    </main>
  );
}
