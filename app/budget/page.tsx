"use client";
import PasswordGate from "@/components/PasswordGate";
import { useMemo, useState } from "react";

export default function Page() {
  return (
    <PasswordGate>
      <BudgetCalc />
    </PasswordGate>
  );
}

function BudgetCalc() {
  const [people, setPeople] = useState(6);
  const [items, setItems] = useState<{label:string; cost:number;}[]>([
    { label: "Airbnb (2 nights)", cost: 1200 },
    { label: "Parking / Rideshare", cost: 180 },
    { label: "Groceries / Snacks", cost: 150 }
  ]);

  const total = useMemo(() => items.reduce((sum, i) => sum + (isNaN(i.cost) ? 0 : i.cost), 0), [items]);
  const per = useMemo(() => (people > 0 ? total / people : 0), [total, people]);

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Budget Split</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="card">
          <div className="text-sm text-white/70">People</div>
          <input type="number" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                 value={people} min={1} onChange={e => setPeople(parseInt(e.target.value || "1"))} />
        </div>
        <div className="card">
          <div className="text-sm text-white/70">Total</div>
          <div className="text-2xl font-semibold">${total.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="text-sm text-white/70">Per Person</div>
          <div className="text-2xl font-semibold">${per.toFixed(2)}</div>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_auto] gap-2">
            <input className="rounded-lg bg-black/30 border border-white/10 px-3 py-2"
                   value={it.label} onChange={e => {
                     const copy = items.slice(); copy[idx] = {...it, label: e.target.value}; setItems(copy);
                   }} />
            <input type="number" className="w-32 rounded-lg bg-black/30 border border-white/10 px-3 py-2"
                   value={it.cost} onChange={e => {
                     const copy = items.slice(); copy[idx] = {...it, cost: parseFloat(e.target.value || "0")}; setItems(copy);
                   }} />
          </div>
        ))}
        <button className="mt-3 rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow"
                onClick={() => setItems(items.concat({ label: "New Item", cost: 0 }))}>+ Add Item</button>
      </div>
    </div>
  );
}
