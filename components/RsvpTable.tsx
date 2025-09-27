"use client";
import { useEffect, useState } from "react";

type RsvpRow = {
  [key: string]: string;
};

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

  // Build columns from the first row’s keys
  const cols = Object.keys(rows[0]);

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

function formatCell(val: string, col: string) {
  if (!val) return "";

  // Try to parse as a date if the column looks like time or timestamp
  if (
    col.toLowerCase().includes("time") ||
    col.toLowerCase().includes("timestamp")
  ) {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
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

