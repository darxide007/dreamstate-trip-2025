"use client";
import { useEffect, useState } from "react";

export default function Countdown({ to }: { to: string }) {
  const [remaining, setRemaining] = useState<null | {d:number,h:number,m:number,s:number}>(null);

  useEffect(() => {
    const target = new Date(to).getTime();
    const id = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setRemaining({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, [to]);

  if (!remaining) return null;
  return (
    <div className="grid grid-cols-4 gap-3">
      {["Days","Hours","Minutes","Seconds"].map((label, i) => {
        const val = [remaining.d, remaining.h, remaining.m, remaining.s][i];
        return (
          <div key={label} className="card text-center">
            <div className="text-3xl font-bold">{val.toString().padStart(2, "0")}</div>
            <div className="text-xs text-white/70">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
