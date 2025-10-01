"use client";
import { useEffect, useState } from "react";

type RsvpRow = Record<string, string>;

export default function RsvpTable() {
  const [rows, setRows] = useState<RsvpRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/rsvps", { cache: "no-store" });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();
        setRows(Array.isArray(data?.rows) ? data.rows : []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load RSVPs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-white/70">Loading RSVPs…</div>;
  if (err) return <div className="text-red-300">Error: {err}</div>;
  if (!rows.length) return <div className="text-white/70">No RSVPs yet.</div>;

  // Build columns from keys of first row, then filter + order them
  const rawCols = Object.keys(rows[0]);

  // 1) Remove any column that looks like a timestamp
  const colsNoTs = rawCols.filter(
    (c) => !/timestamp/i.test(c)
  );

  // 2) Desired order priority
  const desiredOrder = [
    "name",
    "arrival flight",
    "arrival time",
    "departure flight",
    "departure time",
  ];

  const cols = colsNoTs.sort((a, b) => {
    const ai = indexInDesired(a, desiredOrder);
    const bi = indexInDesired(b, desiredOrder);
    return ai - bi;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-white/70 border-b border-white/10">
            {cols.map((c) => (
              <th key={c} className="py-2 pr-4">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-white/5">
              {cols.map((c) => (
                <td key={c} className="py-2 pr-4">
                  {formatCell(r[c], c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function indexInDesired(col: string, order: string[]) {
  const lc = col.toLowerCase();
  const idx = order.findIndex((o) => lc.includes(o));
  return idx === -1 ? order.length + 1 : idx;
}

function formatCell(val: string, col: string) {
  if (!val) return "";

  const lc = col.toLowerCase();
  const looksLikeTime =
    lc.includes("time") || lc.includes("date") || lc.includes("when");

  if (looksLikeTime) {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      // Arrival time → force Pacific Time
      if (lc.includes("arrival")) {
        return d.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Los_Angeles",
        });
      }
      // Departure time → viewer's local timezone (no timeZone option)
      if (lc.includes("departure")) {
        return d.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }
      // Any other time-like field → default to local
      return d.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  }

  return val;
}
