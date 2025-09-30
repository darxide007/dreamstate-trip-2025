"use client";
import { useState } from "react";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);

  if (ok) return <>{children}</>;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const pass = (form.elements.namedItem("pass") as HTMLInputElement).value;
    if (pass === process.env.NEXT_PUBLIC_PASSCODE) {
      setOk(true);
    } else {
      alert("Wrong passcode");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Logo section */}
      <img
        src="/dreamstate-logo.png"
        alt="Dreamstate Logo"
        className="mb-8 w-full max-w-5xl"
      />

      {/* Card with passcode form */}
      <div className="card w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Dreamstate Trip 2025</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="pass"
            type="password"
            placeholder="Enter Passcode"
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
          />
          <button className="w-full rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
