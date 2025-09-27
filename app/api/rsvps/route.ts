import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.SHEETS_READ_URL || process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
    if (!url) {
      return NextResponse.json({ error: "Missing SHEETS_READ_URL" }, { status: 500 });
    }
    // Server-side fetch (no CORS issues)
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error", status: res.status }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
