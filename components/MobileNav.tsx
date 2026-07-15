"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileNavContextValue = {
  openNav: () => void;
};

const MobileNavContext = createContext<MobileNavContextValue>({
  openNav: () => {},
});

export function useMobileNav() {
  return useContext(MobileNavContext);
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Project Dashboard", icon: "dashboard" },
  { href: "/editor", label: "Document Editor", icon: "description" },
  { href: "/linter", label: "Compliance Linter", icon: "fact_check" },
  { href: "/library", label: "Legal Library", icon: "account_balance" },
  { href: "/settings", label: "Settings", icon: "settings" },
] as const;

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <MobileNavContext.Provider value={{ openNav: () => setOpen(true) }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[90] md:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-inverse-surface/60"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[min(85vw,280px)] flex-col bg-inverse-surface py-lg shadow-xl">
            <div className="mb-lg flex items-center justify-between px-lg">
              <span className="font-headline-md text-headline-md font-bold text-surface-container-lowest">
                BriefcaseOS
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="material-symbols-outlined rounded-full p-xs text-surface-container-lowest hover:bg-white/10"
                aria-label="Close menu"
              >
                close
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`mx-sm my-xs flex items-center gap-md rounded-lg px-md py-sm font-label-md transition-colors ${
                      active
                        ? "bg-primary text-on-primary"
                        : "text-surface-variant hover:bg-primary-container/10 hover:text-surface-bright"
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}
    </MobileNavContext.Provider>
  );
}

export function MobileMenuButton() {
  const { openNav } = useMobileNav();

  return (
    <button
      type="button"
      onClick={openNav}
      className="material-symbols-outlined rounded-full p-xs text-primary hover:bg-surface-container-low md:hidden"
      aria-label="Open navigation menu"
    >
      menu_open
    </button>
  );
}
