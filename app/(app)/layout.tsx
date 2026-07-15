import Sidebar from "@/components/Sidebar";
import { MobileNavProvider } from "@/components/MobileNav";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <MobileNavProvider>
        <div className="flex h-screen overflow-hidden bg-surface-bright dark:bg-background">
          <Sidebar />
          <div className="relative min-w-0 flex-1">{children}</div>
        </div>
      </MobileNavProvider>
    </ThemeProvider>
  );
}
