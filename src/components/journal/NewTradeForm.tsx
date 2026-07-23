"use client";

import { useState, useTransition } from "react";
import { createJournalEntry } from "@/lib/actions/journal";
import { TradeDirection } from "@prisma/client";

interface TradeFormState {
  date: string;
  instrument: string;
  direction: TradeDirection;
  entry: string;
  stop: string;
  target: string;
  riskAmount: string;
  session: string;
  killZone: string;
  quarterCycle: string;
  ssmtPresent: boolean;
  tpdPresent: boolean;
  pspPresent: boolean;
  narrative: string;
  confidence: string;
  disciplineScore: string;
  emotion: string;
}

const emptyForm: TradeFormState = {
  date: new Date().toISOString().slice(0, 16),
  instrument: "",
  direction: TradeDirection.LONG,
  entry: "",
  stop: "",
  target: "",
  riskAmount: "",
  session: "",
  killZone: "",
  quarterCycle: "",
  ssmtPresent: false,
  tpdPresent: false,
  pspPresent: false,
  narrative: "",
  confidence: "5",
  disciplineScore: "5",
  emotion: "",
};

export function NewTradeForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof TradeFormState>(key: K, value: TradeFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.instrument || !form.entry || !form.stop) {
      setError("Instrument, entry, and stop are required.");
      return;
    }

    startTransition(async () => {
      try {
        await createJournalEntry({
          date: form.date,
          instrument: form.instrument.toUpperCase(),
          direction: form.direction,
          entry: parseFloat(form.entry),
          stop: parseFloat(form.stop),
          target: form.target ? parseFloat(form.target) : undefined,
          riskAmount: form.riskAmount ? parseFloat(form.riskAmount) : undefined,
          session: form.session || undefined,
          killZone: form.killZone || undefined,
          quarterCycle: form.quarterCycle || undefined,
          ssmtPresent: form.ssmtPresent,
          tpdPresent: form.tpdPresent,
          pspPresent: form.pspPresent,
          narrative: form.narrative || undefined,
          confidence: parseInt(form.confidence),
          disciplineScore: parseInt(form.disciplineScore),
          emotion: form.emotion || undefined,
        });
        setForm(emptyForm);
        setOpen(false);
      } catch {
        setError("Couldn't save the trade. Try again.");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-grad-primary px-4 py-2 text-xs font-medium text-white shadow-glow hover:brightness-110"
      >
        + New Trade
      </button>
    );
  }

  const inputClass =
    "h-9 w-full rounded-lg border border-base-border bg-base-deep px-3 text-sm text-ink-primary focus:border-accent-blue/50 focus:outline-none";
  const labelClass = "mb-1 block text-xs text-ink-tertiary";

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-primary">New Trade</h3>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-ink-tertiary hover:text-ink-primary">
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Instrument *</label>
          <input className={inputClass} value={form.instrument} onChange={(e) => update("instrument", e.target.value)} placeholder="NQ" />
        </div>
        <div>
          <label className={labelClass}>Direction</label>
          <select className={inputClass} value={form.direction} onChange={(e) => update("direction", e.target.value as TradeDirection)}>
            <option value="LONG">Long</option>
            <option value="SHORT">Short</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Date/Time</label>
          <input type="datetime-local" className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Entry *</label>
          <input type="number" step="any" className={inputClass} value={form.entry} onChange={(e) => update("entry", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Stop *</label>
          <input type="number" step="any" className={inputClass} value={form.stop} onChange={(e) => update("stop", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Target</label>
          <input type="number" step="any" className={inputClass} value={form.target} onChange={(e) => update("target", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Session</label>
          <select className={inputClass} value={form.session} onChange={(e) => update("session", e.target.value)}>
            <option value="">—</option>
            <option>Asian</option>
            <option>London</option>
            <option>NY</option>
            <option>NY PM</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Kill Zone</label>
          <input className={inputClass} value={form.killZone} onChange={(e) => update("killZone", e.target.value)} placeholder="NY Open 9:00-10:30" />
        </div>
        <div>
          <label className={labelClass}>Quarter</label>
          <input className={inputClass} value={form.quarterCycle} onChange={(e) => update("quarterCycle", e.target.value)} placeholder="Q2 – Manipulation" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-ink-secondary">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={form.ssmtPresent} onChange={(e) => update("ssmtPresent", e.target.checked)} /> SSMT
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={form.tpdPresent} onChange={(e) => update("tpdPresent", e.target.checked)} /> TPD
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={form.pspPresent} onChange={(e) => update("pspPresent", e.target.checked)} /> PSP
        </label>
      </div>

      <div>
        <label className={labelClass}>Narrative</label>
        <textarea className={`${inputClass} h-16`} value={form.narrative} onChange={(e) => update("narrative", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Confidence (1-10)</label>
          <input type="number" min={1} max={10} className={inputClass} value={form.confidence} onChange={(e) => update("confidence", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Discipline (1-10)</label>
          <input type="number" min={1} max={10} className={inputClass} value={form.disciplineScore} onChange={(e) => update("disciplineScore", e.target.value)} />
        </div>
      </div>

      {error && <p className="text-xs text-signal-down">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-grad-primary py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Trade"}
      </button>
    </form>
  );
}
