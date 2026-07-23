import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-base-void">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
