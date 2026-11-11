"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BriefcaseGuideWidget from "@/components/BriefcaseGuideWidget";
import UserMenu from "@/components/UserMenu";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  enabled: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Project Dashboard", icon: "dashboard", enabled: true },
  { href: "/editor", label: "Document Editor", icon: "description", enabled: true },
  { href: "/linter", label: "Compliance Linter", icon: "fact_check", enabled: true },
  { href: "/library", label: "Legal Library", icon: "account_balance", enabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderItem = (item: NavItem) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
    const base =
      "flex items-center gap-md px-md py-sm mx-sm my-xs rounded-lg transition-colors";
    const state = active
      ? "bg-primary text-on-primary"
      : "text-surface-variant hover:text-surface-bright hover:bg-primary-container/10";
    const disabled = !item.enabled ? "opacity-40 pointer-events-none" : "";

    return (
      <Link
        key={item.href}
        href={item.enabled ? item.href : "#"}
        aria-current={active ? "page" : undefined}
        aria-disabled={!item.enabled}
        className={`${base} ${state} ${disabled}`}
      >
        <span className="material-symbols-outlined">{item.icon}</span>
        <span className="font-label-md text-label-md">{item.label}</span>
      </Link>
    );
  };

  const footerChrome = (
    <div className="flex flex-col items-start gap-2 px-lg pt-2">
      <BriefcaseGuideWidget placement="sidebar" />
      <div className="rounded-full border border-outline-variant/30 bg-surface-container-lowest/10 p-1">
        <UserMenu />
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-outline-variant/20 bg-inverse-surface py-lg dark:border-outline-variant/40 md:flex">
        <div className="mb-xl px-lg">
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-inverse-on-surface">
            BriefcaseOS
          </span>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto">
          {NAV_ITEMS.map(renderItem)}
        </nav>
        <div className="mt-auto border-t border-outline-variant/20 pt-md">
          {renderItem({
            href: "/settings",
            label: "Settings",
            icon: "settings",
            enabled: true,
          })}
          {footerChrome}
        </div>
      </aside>

      {/* Mobile: same controls bottom-left */}
      <div
        className="fixed bottom-4 left-4 z-[80] flex flex-col items-start gap-2 md:hidden"
        aria-label="App shortcuts"
      >
        <BriefcaseGuideWidget placement="sidebar" />
        <div className="rounded-full border border-outline-variant/30 bg-surface-container-lowest p-1 shadow-lg dark:bg-inverse-surface">
          <UserMenu />
        </div>
      </div>
    </>
  );
}
