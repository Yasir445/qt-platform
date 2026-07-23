import { GraduationCap, NotebookPen, Repeat, TrendingUp } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatCard } from "@/components/dashboard/StatCard";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { UpcomingNews } from "@/components/dashboard/UpcomingNews";
import { CurrentQuarter } from "@/components/dashboard/CurrentQuarter";
import { RecentJournal } from "@/components/dashboard/RecentJournal";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { QuickNotes } from "@/components/dashboard/QuickNotes";

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="space-y-6 p-6">
        <WelcomeBanner name="Yasir Ali" />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={GraduationCap} label="Learning Progress" value="78%" sublabel="Continue Learning" />
          <StatCard icon={NotebookPen} label="Journal Entries" value="56" sublabel="This Month" />
          <StatCard icon={Repeat} label="Backtests Run" value="34" sublabel="This Month" tone="up" />
          <StatCard icon={TrendingUp} label="Win Rate" value="62.4%" sublabel="This Month" tone="up" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <MarketOverview />
          <UpcomingNews />
          <CurrentQuarter />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <RecentJournal />
          <ContinueLearning />
          <QuickNotes />
        </div>
      </div>
    </>
  );
}
