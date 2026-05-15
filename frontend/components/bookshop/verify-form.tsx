"use client";

import { useState, useRef } from "react";
import { ShieldCheck, Clock } from "lucide-react";

const CODE_LENGTH = 6;

function CodeInput({ onComplete }: { onComplete: (code: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, v: string) => {
    if (!/^[0-9]?$/.test(v)) return;

    const next = [...values];
    next[i] = v;
    setValues(next);

    if (v && i < CODE_LENGTH - 1) refs.current[i + 1]?.focus();
    if (next.every((x) => x !== "")) onComplete(next.join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((c, i) => { next[i] = c; });
    setValues(next);
    refs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
    if (pasted.length === CODE_LENGTH) onComplete(pasted);
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          maxLength={1}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          className="h-14 rounded-lg border border-border bg-secondary/50 text-center text-xl font-bold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      ))}
    </div>
  );
}

export function VerifyForm() {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Check your <span className="text-primary">inbox.</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We sent a 6-digit confirmation code to verify it&apos;s really you.
            <br />
            Enter it below to unlock your personal library.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card px-8 py-8">
          <form className="flex flex-col gap-6">
            {/* OTP inputs */}
            <div>
              <label className="mb-3 block text-sm font-medium text-foreground">
                Confirmation code
              </label>
              <CodeInput onComplete={setCode} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={code.length !== CODE_LENGTH}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify account
              <ShieldCheck className="h-4 w-4" />
            </button>

            {/* Resend */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Didn&apos;t receive the code?</span>
              <button
                type="button"
                className="font-medium text-primary hover:underline"
              >
                Resend code →
              </button>
            </div>

            {/* Expiry badge */}
            <div className="flex items-center justify-end border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Code expires in 9:51
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
