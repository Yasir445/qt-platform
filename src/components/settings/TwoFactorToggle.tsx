"use client";

import { useState } from "react";

export function TwoFactorToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <label className="relative inline-flex h-6 w-[42px] shrink-0 cursor-pointer items-center">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
        className="peer sr-only"
      />
      <span className="absolute inset-0 rounded-full bg-base-borderLight transition-colors peer-checked:bg-accent-blue" />
      <span className="absolute left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform peer-checked:translate-x-[18px]" />
    </label>
  );
}
