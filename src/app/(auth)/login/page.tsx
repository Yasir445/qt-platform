"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    window.location.href = res?.url || callbackUrl;
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-ink-primary">Welcome back</h1>
      <p className="mt-1 text-sm text-ink-secondary">Log in to your QT command center.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-secondary">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-lg border border-base-border bg-base-deep px-3 text-sm text-ink-primary focus:border-accent-blue/50 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-secondary">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-lg border border-base-border bg-base-deep px-3 text-sm text-ink-primary focus:border-accent-blue/50 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-xs text-signal-down">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-lg bg-grad-primary text-sm font-medium text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-base-border" />
        <span className="text-xs text-ink-tertiary">or</span>
        <div className="h-px flex-1 bg-base-border" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="h-10 w-full rounded-lg border border-base-borderLight bg-base-surface text-sm font-medium text-ink-primary hover:bg-base-raised"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-xs text-ink-tertiary">
        Don&rsquo;t have an account?{" "}
        <Link href="/signup" className="text-accent-blueLight hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-sm text-ink-tertiary">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
