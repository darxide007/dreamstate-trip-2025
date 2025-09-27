"use client";

export default function RSVPForm() {
  const webhook = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);

    if (!webhook) {
      alert("Webhook URL not set (NEXT_PUBLIC_SHEETS_WEBHOOK_URL). Add it in Vercel → Settings → Environment Variables, then redeploy.");
      return;
    }

    try {
      // Send as x-www-form-urlencoded to avoid CORS preflight (OPTIONS)
      const body = new URLSearchParams(data as Record<string, string>).toString();

      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body
      });

      if (!res.ok) {
        // Fallback: blind post (no-cors) – can't read response, but Sheets usually receives it
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
        alert("Submission failed. Double-check:\n• Apps Script deployed as Web app → Anyone\n• Using the /exec URL\n• Env var set for this environment (Preview/Production)\n• Redeployed after changes");
      }
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          name="name"
          required
          className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
          placeholder="e.g., Bryan"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Arrival Flight</label>
          <input
            name="arrivalFlight"
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
            placeholder="e.g., AS 338"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Arrival Time</label>
          <input
            name="arrivalTime"
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
            placeholder="e.g., Thu 11/20 6:10 PM"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Departure Flight</label>
          <input
            name="departureFlight"
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
            placeholder="e.g., AS 541"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Departure Time</label>
          <input
            name="departureTime"
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
            placeholder="e.g., Sat 11/22 11:05 PM"
          />
        </div>
      </div>

      <button className="mt-2 rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow">
        Submit
      </button>

      {/* Optional: quick indicator if env var is missing */}
      {!webhook && (
        <p className="text-xs text-red-300 mt-2">
          Env var NEXT_PUBLIC_SHEETS_WEBHOOK_URL is not set for this deployment.
        </p>
      )}
    </form>
  );
}
