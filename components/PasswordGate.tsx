"use client";
import { useEffect, useState } from "react";
import { tripConfig } from "@/lib/config/trip.config"; // fallback passcode if env not set

const GATE_KEY = "ds_gate_ok";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null); // null = loading
  const passcode =
    process.env.NEXT_PUBLIC_PASSCODE || tripConfig?.passcode || ""; // prefer env var

  useEffect(() => {
    // Restore persisted gate state on every page
    try {
      const saved = localStorage.getItem(GATE_KEY);
      setOk(saved === "true");
    } catch {
      setOk(false);
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = (form.elements.namedItem("pass") as HTMLInputElement)?.value || "";

    if (!passcode) {
      alert("No passcode is configured. Set NEXT_PUBLIC_PASSCODE in Vercel (or tripConfig.passcode).");
      return;
    }
    if (input === passcode) {
      try {
        localStorage.setItem(GATE_KEY, "true");
      } catch {}
      setOk(true);
    } else {
      alert("Wrong passcode");
    }
  }

  // While checking localStorage, avoid a flash
  if (ok === null) {
    return <div className="min-h-screen px-4 pt-16 text-white"> </div>;
  }

  if (ok) return <>{children}</>;

  // --- Gate screen (top-aligned with Dreamstate theme) ---
  return (
    <div
      className="min-h-screen flex flex-col items-center text-white px-4 pt-24"
      style={{
        background: `
          radial-gradient(1000px 600px at 10% 20%, rgba(0,255,255,0.10), transparent 60%),
          radial-gradient(900px 500px at 90% 70%, rgba(255,0,255,0.08), transparent 50%),
          linear-gradient(to bottom right, #050b18, #0b1226)
        `,
      }}
    >
      {/* Logo (large, independent from card) */}
      <img
        src="/dreamstate-logo.png"
        alt="Dreamstate Logo"
        className="mb-8 w-[20rem] md:w-[32rem] lg:w-[40rem] xl:w-[48rem] max-w-full drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]"
      />

      {/* Passcode card */}
      <div className="card w-full max-w-sm text-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
        <h1 className="text-2xl font-bold mb-4">Dreamstate Fiend Trip 2025</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="pass"
            type="password"
            placeholder="Enter Passcode"
            className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2 text-white placeholder-white/40"
          />
          <button className="w-full rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-4 py-2 shadow-[0_0_20px_rgba(0,255,255,0.6)]">
            Enter
          </button>
        </form>

        {/* Optional helper text */}
        {!passcode && (
          <p className="mt-3 text-xs text-red-300">
            NEXT_PUBLIC_PASSCODE not set; using tripConfig.passcode (less secure).
          </p>
        )}
      </div>
    </div>
  );
}
