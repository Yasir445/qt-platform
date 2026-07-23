import { Topbar } from "@/components/layout/Topbar";
import { TwoFactorToggle } from "@/components/settings/TwoFactorToggle";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" />
      <div className="space-y-4 p-4 sm:p-6">
        <span className="inline-block rounded-full border border-accent-purple/30 bg-accent-purple/15 px-3 py-1 text-xs text-accent-purple">
          2FA + device management — see implementation plan §4A
        </span>

        <div className="glass-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-ink-primary">Profile</h3>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-grad-primary text-base font-semibold text-white">
              YA
            </div>
            <div>
              <div className="text-[15px] font-semibold text-ink-primary">Yasir Ali</div>
              <div className="text-xs text-ink-tertiary">Premium Member since Jan 2026</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-ink-primary">Two-Factor Authentication</h3>
              <p className="text-xs text-ink-tertiary">
                Require a TOTP code (Google Authenticator, Authy) at login.
              </p>
            </div>
            <TwoFactorToggle />
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-ink-primary">Active Devices</h3>
          <p className="mb-3.5 text-xs text-ink-tertiary">Sign out any device you don&rsquo;t recognize.</p>
          <div className="flex items-center justify-between border-b border-base-border py-2 text-sm">
            <span>
              📱 Chrome on Android <span className="text-xs text-signal-up">· this device</span>
            </span>
            <span className="text-xs text-ink-tertiary">Active now</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm">
            <span>💻 Chrome on Windows</span>
            <span className="flex items-center gap-2 text-xs text-ink-tertiary">
              3 days ago
              <button className="rounded-lg border border-base-borderLight px-2.5 py-1 text-[11px] text-ink-primary hover:bg-base-raised">
                Revoke
              </button>
            </span>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="mb-1 text-sm font-semibold text-ink-primary">Billing</h3>
          <div className="flex justify-between border-b border-base-border py-2 text-sm">
            <span className="text-ink-tertiary">Plan</span>
            <span>Premium — $29/mo</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-ink-tertiary">Renews</span>
            <span>Aug 17, 2026</span>
          </div>
          <button className="mt-3.5 w-full rounded-lg border border-base-border py-2 text-xs font-medium text-ink-secondary hover:bg-base-raised hover:text-ink-primary">
            Manage Billing →
          </button>
        </div>
      </div>
    </>
  );
}
