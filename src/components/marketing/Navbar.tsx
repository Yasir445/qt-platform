import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Roadmap", href: "#roadmap" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-border/60 bg-base-void/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-primary font-mono text-sm font-bold text-white">
            QT
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">QUARTERLY THEORY</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-ink-secondary hover:text-ink-primary sm:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-8 items-center justify-center rounded-xl bg-grad-primary px-4 text-sm font-medium text-white shadow-glow transition-all duration-150 hover:brightness-110"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
