"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  RefreshCw,
  Clock,
  CalendarDays,
  BookMarked,
  BookOpen,
  NotebookPen,
  History,
  LineChart,
  CalendarClock,
  Bookmark,
  Download,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, built: true }],
  },
  {
    label: "Learn",
    items: [
      { label: "Quarterly Theory", href: "/quarterly-theory", icon: Compass, built: true },
      { label: "Quarter Sequence", href: "/quarter-sequence", icon: RefreshCw, built: false },
      { label: "Time Framework", href: "/time-framework", icon: Clock, built: false },
      { label: "Economic Calendar", href: "/economic-calendar", icon: CalendarDays, built: true },
      { label: "JEM Library", href: "/jem-library", icon: BookMarked, built: true },
      { label: "Glossary", href: "/glossary", icon: BookOpen, built: false },
    ],
  },
  {
    label: "Practice",
    items: [
      { label: "Research", href: "/research", icon: NotebookPen, built: true },
      { label: "Trade Journal", href: "/journal", icon: History, built: true },
      { label: "Backtesting", href: "/backtesting", icon: LineChart, built: true },
      { label: "TradingView", href: "/tradingview", icon: LineChart, built: true },
    ],
  },
  {
    label: "More",
    items: [
      { label: "Calendar", href: "/calendar", icon: CalendarClock, built: false },
      { label: "Bookmarks", href: "/bookmarks", icon: Bookmark, built: false },
      { label: "Downloads", href: "/downloads", icon: Download, built: false },
      { label: "Community", href: "/community", icon: Users, built: false },
      { label: "Settings", href: "/settings", icon: Settings, built: true },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-base-border bg-base-deep">
      <div className="flex h-16 items-center gap-2.5 border-b border-base-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-primary font-mono text-sm font-bold text-white">
          QT
        </div>
        <span className="text-sm font-semibold tracking-wide">QUARTERLY THEORY</span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group, i) => (
          <div key={i}>
            {group.label && (
              <div className="label-eyebrow mb-2 px-3">{group.label}</div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;

                if (!item.built) {
                  return (
                    <div
                      key={item.href}
                      className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-disabled"
                      title="Coming soon"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      <span className="rounded-full border border-base-borderLight px-1.5 py-0.5 text-[10px] text-ink-tertiary">
                        Soon
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-accent-blue/15 text-accent-blueLight"
                        : "text-ink-secondary hover:bg-base-raised hover:text-ink-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-base-border p-4">
        <div className="glass-card flex items-center gap-3 !rounded-xl p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-primary text-xs font-semibold text-white">
            YA
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink-primary">
              Need Help?
            </div>
            <div className="truncate text-xs text-ink-tertiary">Contact Support</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
