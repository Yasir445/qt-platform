import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel: string;
  tone?: "default" | "up" | "down";
}

export function StatCard({ icon: Icon, label, value, sublabel, tone = "default" }: StatCardProps) {
  return (
    <div className="glass-card glass-card-hover p-4">
      <div className="flex items-center gap-2 text-ink-tertiary">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <div
        className={cn(
          "stat-value mt-2",
          tone === "up" && "text-signal-up",
          tone === "down" && "text-signal-down"
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-tertiary">{sublabel}</div>
    </div>
  );
}
