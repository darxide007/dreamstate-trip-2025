"use client";
import { useEffect, useState } from "react";
import { tripConfig } from "@/lib/config/trip.config";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("ds_gate_ok") : null;
    if (saved === "true") setOk(true);
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === tripConfig.passcode) {
      localStorage.setItem("ds_gate_ok", "true");
      setOk(true);
    } else {
      alert("Wrong passcode");
    }
  };

  if (ok) return <>{children}</>;
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form onSubmit={check} className="card w-full max-w-md">
        <h1 className="text-xl font-semibold mb-2">Enter Passcode</h1>
        <p className="text-white/70 mb-4">Private trip hub. Ask the crew for the passcode.</p>
        <input
          type="password"
          className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-400"
          placeholder="Passcode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="mt-4 w-full rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold py-2 shadow-glow">
          Enter
        </button>
      </form>
    </div>
  );
}
