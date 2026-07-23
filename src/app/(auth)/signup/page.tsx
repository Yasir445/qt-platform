"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (signInRes?.error) {
      // Account was created but auto-login failed — send them to login instead
      router.push("/login");
      return;
    }
    window.location.href = signInRes?.url || "/dashboard";
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-ink-primary">Create your account</h1>
      <p className="mt-1 text-sm text-ink-secondary">Start your 7-day free trial.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-secondary">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-lg border border-base-border bg-base-deep px-3 text-sm text-ink-primary focus:border-accent-blue/50 focus:outline-none"
            placeholder="Yasir Ali"
          />
        </div>
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-lg border border-base-border bg-base-deep px-3 text-sm text-ink-primary focus:border-accent-blue/50 focus:outline-none"
            placeholder="At least 8 characters"
          />
        </div>

        {error && <p className="text-xs text-signal-down">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-lg bg-grad-primary text-sm font-medium text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-ink-tertiary">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-blueLight hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
