"use client";

export default function RSVPForm() {
  const webhook = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);

    if (!webhook) {
      alert("Webhook URL not set in Vercel (NEXT_PUBLIC_SHEETS_WEBHOOK_URL).");
      return;
    }

    try {
      // Convert to URL-encoded to avoid CORS preflight (no OPTIONS)
      const body = new URLSearchParams(data as Record<string, string>).toString();

      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body
      });

      // We can usually read a JSON 200 here
      if (!res.ok) {
        // As a fallback, try a no-cors blind POST (often still succeeds)
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body
        });
        alert("Submitted! (fallback). Check the Google Sheet to confirm.");
      } else {
        alert("Submitted! See the Google Sheet.");
      }

      form.reset();
      if (typeof window !== "undefined") {
        localStorage.setItem("rsvp_name", (data.name as string) || "");
      }
    } catch {
      // Final fallback if extensions or strict privacy settings block CORS
      try {
        const body = new URLSearchParams(data as Record<string, string>).toString();
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body
        });
        alert("Submitted! (fallback). Check the Google Sheet to confirm.");
        form.reset();
      } catch {
        alert("Submission failed. Double-check:\n• Apps Script is deployed as Web app → Anyone\n• Using the /exec URL\n• Env var set in the same Vercel environment\n• Redeployed after changes");
      }
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {/* ... your inputs ... */}
      <button className="mt-2 rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow">
        Submit
      </button>
    </form>
  );
}
