import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-void px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-grad-primary font-mono text-sm font-bold text-white">
            QT
          </div>
          <span className="text-sm font-semibold tracking-wide">QUARTERLY THEORY</span>
        </Link>
        <div className="glass-card p-6">{children}</div>
      </div>
    </div>
  );
}
