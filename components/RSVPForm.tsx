"use client";

export default function RSVPForm() {
  const webhook = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);

    if (!webhook) {
      alert("Webhook URL not set. Ask the organizer to configure NEXT_PUBLIC_SHEETS_WEBHOOK_URL in Vercel.");
      return;
    }

    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Non-200 from webhook");

      alert("Submitted! Check the Google Sheet.");
      form.reset();
      if (typeof window !== "undefined") {
        localStorage.setItem("rsvp_name", (data.name as string) || "");
      }
    } catch (err) {
      alert("Submission failed. Check the webhook URL & Apps Script deployment.");
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
    </form>
  );
}
