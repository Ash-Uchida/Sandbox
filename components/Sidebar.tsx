"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { href: "/library", label: "Legal Library", icon: "account_balance", enabled: false },
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

  return (
    <aside className="hidden md:flex flex-col h-screen w-[260px] py-lg bg-inverse-surface border-r border-outline-variant/20 shrink-0">
      <div className="px-lg mb-xl">
        <span className="font-headline-md text-headline-md font-bold text-surface-container-lowest tracking-tight">
          BriefcaseOS
        </span>
      </div>
      <nav className="flex-1 flex flex-col overflow-y-auto">
        {NAV_ITEMS.map(renderItem)}
        <div className="mt-auto">
          {renderItem({
            href: "/settings",
            label: "Settings",
            icon: "settings",
            enabled: false,
          })}
        </div>
      </nav>
    </aside>
  );
}
