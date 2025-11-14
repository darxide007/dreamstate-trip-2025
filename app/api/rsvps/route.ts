import { NextResponse } from "next/server";

function toFormUrlEncoded(data: Record<string, unknown>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    params.append(key, String(value));
  }
  return params.toString();
}

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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Webhook URL not set (NEXT_PUBLIC_SHEETS_WEBHOOK_URL). Add it in Vercel → Settings → Environment Variables, then redeploy."
        },
        { status: 500 }
      );
    }

    const payload = await req.json();
    const body = toFormUrlEncoded(payload as Record<string, unknown>);

    const upstreamResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body
    });

    if (!upstreamResponse.ok) {
      const text = await upstreamResponse.text();
      return NextResponse.json(
        {
          success: false,
          message: `Upstream webhook error (status ${upstreamResponse.status}). ${text || ""}`.trim()
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json({ success: true, message: "Submitted! See the Google Sheet." }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
