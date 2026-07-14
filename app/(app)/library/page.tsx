import type { Metadata } from "next";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

export const metadata: Metadata = {
  title: "Legal Library | BriefcaseOS",
};

const RESOURCES = [
  {
    title: "GDPR Amendments (2024)",
    description: "Summary of key EU privacy regulation updates for contract review.",
    category: "Privacy",
    href: "/editor",
  },
  {
    title: "Standardized SaaS Terms",
    description: "Baseline clauses for software subscription agreements.",
    category: "Commercial",
    href: "/editor",
  },
  {
    title: "California Privacy Rights Update",
    description: "CPRA obligations for vendor and customer data processing.",
    category: "Privacy",
    href: "/linter",
  },
  {
    title: "Limitation of Liability Playbook",
    description: "Benchmark caps and carve-outs for enterprise MSAs.",
    category: "Risk",
    href: "/linter",
  },
] as const;

export default function LibraryPage() {
  return (
    <main className="flex-1 h-screen overflow-y-auto relative flex flex-col">
      <header className="sticky top-0 w-full z-40 flex justify-between items-center h-[64px] px-lg bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant">
        <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
          Legal Library
        </h1>
        <UserMenu />
      </header>

      <div className="p-lg lg:p-xl max-w-[1200px] mx-auto w-full space-y-lg">
        <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-xs">
            Reference materials
          </h2>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            Curated templates and guidance to speed up review. Open a resource to
            start working in the editor or linter.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {RESOURCES.map((resource) => (
            <article
              key={resource.title}
              className="bg-surface-container-low p-lg rounded-xl border border-outline-variant/20 flex flex-col gap-md"
            >
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-sm py-xs font-label-md text-primary">
                {resource.category}
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">
                  {resource.title}
                </h3>
                <p className="text-body-sm text-on-surface-variant">
                  {resource.description}
                </p>
              </div>
              <Link
                href={resource.href}
                className="mt-auto inline-flex items-center gap-xs font-label-md text-primary hover:underline"
              >
                Open resource
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
