import type { Metadata } from "next";
import UserMenu from "@/components/UserMenu";
import { getActiveUser } from "@/lib/user";
import { getContract } from "@/lib/contracts";
import styles from "./editor.module.css";

export const metadata: Metadata = {
  title: "Document Editor | BriefcaseOS",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ contract?: string }>;
};

export default async function EditorPage({ searchParams }: Props) {
  const { contract: contractId } = await searchParams;
  const user = await getActiveUser();
  const contract = contractId
    ? await getContract(user.id, contractId)
    : null;
  const title = contract?.name ?? "Project Alpha - Master Service Agreement";
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center h-[64px] px-lg bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <button className="md:hidden p-sm hover:bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined" data-icon="menu">
              menu
            </span>
          </button>
          <span
            className="material-symbols-outlined text-primary"
            data-icon="menu_open"
          >
            menu_open
          </span>
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-md">
          <button className="flex items-center gap-xs px-md py-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors duration-200">
            <span className="material-symbols-outlined text-[18px]" data-icon="share">
              share
            </span>
            Share
          </button>
          <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md text-label-md hover:opacity-90 transition-all">
            Export PDF
          </button>
          <UserMenu />
        </div>
      </header>

      {/* Split-Screen Editor & Chat */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-surface-container-low">
        {/* Editor Pane (Top 55% on mobile / Left Flex on desktop) */}
        <section
          className={`h-[55%] md:h-full md:flex-[0.6] bg-[#F7F9FC] border-b md:border-b-0 md:border-r border-outline-variant overflow-y-auto ${styles.customScrollbar} p-xl`}
        >
          <div className="max-w-[800px] mx-auto bg-white p-[60px] shadow-sm border border-outline-variant/30 min-h-full">
            <div className="space-y-md text-[#333333] font-body-md leading-[1.6]">
              <h2 className="font-headline-sm text-center mb-xl underline uppercase">
                Commercial Lease Agreement
              </h2>
              <p>
                <span className="font-bold">SECTION 4. RENT AND OTHER PAYMENTS</span>
              </p>
              <p>
                4.1 Tenant shall pay to Landlord as Base Rent for the Premises the
                sum of Five Thousand Dollars ($5,000.00) per month, payable in
                advance on the first day of each calendar month during the Term.
              </p>
              {/* Highlighted Active Clause */}
              <div className="relative group">
                <div className="p-md border-2 border-primary-container bg-primary-container/5 rounded-lg -mx-md transition-all">
                  <p className="relative z-10">
                    <span className="font-bold">4.2 LIMITATION OF LIABILITY.</span>{" "}
                    Neither Landlord nor Tenant shall be liable for any
                    consequential, indirect, special, punitive, or exemplary
                    damages, or for loss of profits, whether or not such party has
                    been advised of the possibility of such damages. In no event
                    shall Landlord&apos;s liability under this Lease exceed the
                    total amount of rent paid by Tenant during the preceding twelve
                    (12) month period.
                  </p>
                  {/* AI Inline Suggestion */}
                  <div className="absolute -top-12 right-0 bg-primary-container text-on-primary-container px-md py-sm rounded-lg shadow-lg flex items-center gap-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      data-icon="auto_awesome"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="font-label-md text-label-md">
                      Drafting a more strict limitation of liability clause...
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                  </div>
                </div>
              </div>
              <p>
                4.3 Late Charges. If any installment of Rent is not received by
                Landlord within five (5) days after the date when due, Tenant shall
                pay a late charge equal to five percent (5%) of such overdue amount.
              </p>
              <p>
                <span className="font-bold">SECTION 5. USE OF PREMISES</span>
              </p>
              <p>
                5.1 Permitted Use. The Premises shall be used and occupied by Tenant
                solely for general office purposes and for no other purpose without
                the prior written consent of Landlord.
              </p>
              <p>
                5.2 Compliance with Laws. Tenant shall, at its sole cost and
                expense, comply with all laws, ordinances, orders, rules and
                regulations of state, federal, municipal and other agencies or
                bodies having jurisdiction over the Premises.
              </p>
              <p>
                5.3 Hazardous Materials. Tenant shall not cause or permit any
                Hazardous Materials to be brought upon, kept or used in or about the
                Premises by Tenant, its agents, employees, contractors or invitees.
              </p>
            </div>
          </div>
        </section>

        {/* AI Chat Pane (Bottom 45% on mobile / Right Flex on desktop) */}
        <section className="h-[45%] md:h-full md:flex-[0.4] bg-[#1E293B] flex flex-col text-white shadow-2xl relative">
          {/* Chat Header */}
          <div className="px-lg py-md border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-sm">
              <span
                className="material-symbols-outlined text-primary-fixed-dim"
                data-icon="smart_toy"
              >
                smart_toy
              </span>
              <span className="font-headline-sm text-[16px] font-semibold">
                AI Assistant
              </span>
            </div>
            <div className="flex gap-sm">
              <button className="p-xs hover:bg-white/10 rounded">
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon="history"
                >
                  history
                </span>
              </button>
              <button className="p-xs hover:bg-white/10 rounded">
                <span
                  className="material-symbols-outlined text-[18px]"
                  data-icon="close"
                >
                  close
                </span>
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div
            className={`flex-1 overflow-y-auto ${styles.customScrollbar} p-lg space-y-lg`}
          >
            {/* User Message */}
            <div className="flex flex-col items-end gap-xs max-w-[90%] ml-auto">
              <div className="bg-primary/40 p-md rounded-xl rounded-tr-none border border-primary/50">
                <p className="text-body-md">
                  Can you analyze the limitation of liability clause in Section
                  4.2? It feels too lenient for the Landlord.
                </p>
              </div>
              <span className="text-white/40 font-label-md text-[10px]">
                10:42 AM
              </span>
            </div>
            {/* AI Response */}
            <div className="flex flex-col items-start gap-xs max-w-[95%]">
              <div className="flex gap-md">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[18px] text-white"
                    data-icon="auto_awesome"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
                <div className="bg-white/5 p-md rounded-xl rounded-tl-none border border-white/10">
                  <p className="text-body-md mb-md">
                    I&apos;ve analyzed{" "}
                    <span className="text-primary-fixed-dim font-semibold">
                      Section 4.2
                    </span>
                    . You&apos;re correct—the current language heavily favors the
                    Landlord by capping their total liability at the last 12 months
                    of rent while maintaining broad exclusions for the Tenant.
                  </p>
                  <p className="text-body-md mb-md italic text-white/70">
                    &quot;In no event shall Landlord&apos;s liability... exceed the
                    total amount of rent paid... preceding twelve month period.&quot;
                  </p>
                  <div className="flex flex-wrap gap-sm mt-md">
                    <button className="bg-tertiary-container text-on-tertiary-container px-sm py-xs rounded flex items-center gap-xs font-label-md text-[11px] hover:opacity-80 transition-opacity">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        data-icon="link"
                      >
                        link
                      </span>
                      [Line 42]
                    </button>
                    <button className="bg-secondary-container/20 text-white/80 px-sm py-xs rounded flex items-center gap-xs font-label-md text-[11px] hover:bg-white/10 transition-colors">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        data-icon="gavel"
                      >
                        gavel
                      </span>
                      Market Standard
                    </button>
                  </div>
                </div>
              </div>
              <span className="text-white/40 font-label-md text-[10px] ml-12">
                10:43 AM
              </span>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-lg bg-white/5 border-t border-white/10">
            <div className="relative group">
              <textarea
                className="w-full bg-[#0F172A] border border-white/20 rounded-xl px-md py-md text-white placeholder-white/40 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all resize-none font-body-md"
                placeholder="Ask BriefcaseOS..."
                rows={2}
              />
              <div className="absolute right-md bottom-md flex gap-sm">
                <button className="p-sm text-white/40 hover:text-white transition-colors">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    data-icon="attach_file"
                  >
                    attach_file
                  </span>
                </button>
                <button className="bg-primary text-white p-sm rounded-lg hover:scale-105 transition-transform flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    data-icon="send"
                  >
                    send
                  </span>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-sm">
              <div className="flex gap-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-label-md text-[10px] text-white/40">
                  AI Engine: GPT-4 Legal-Pro
                </span>
              </div>
              <div className="flex gap-sm">
                <button className="font-label-md text-[11px] text-primary-fixed-dim hover:underline">
                  Draft Counter-Clause
                </button>
                <span className="text-white/20">|</span>
                <button className="font-label-md text-[11px] text-primary-fixed-dim hover:underline">
                  Verify Citations
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
