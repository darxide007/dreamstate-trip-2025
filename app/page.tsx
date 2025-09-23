import PasswordGate from "@/components/PasswordGate";
import Countdown from "@/components/Countdown";
import { tripConfig } from "@/lib/config/trip.config";

export default function Home() {
  return (
    <PasswordGate>
      <section className="mb-8">
        <div className="card">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dreamstate SoCal 2025 — Trip Hub</h1>
          <p className="text-white/70">
            Long Beach, CA · Trip window {new Date(tripConfig.tripWindow.start).toLocaleDateString()}–{new Date(tripConfig.tripWindow.end).toLocaleDateString()} · Festival {new Date(tripConfig.festivalDays.start).toLocaleDateString()}–{new Date(tripConfig.festivalDays.end).toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-semibold tracking-wide">Countdown to Day 1</h2>
        <Countdown to={`${tripConfig.festivalDays.start}T17:00:00`} />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">RSVP & Flights</h3>
          <p className="text-white/70 mb-4">Enter your name and flight details. This will post to our Google Sheet.</p>
          <RSVPForm />
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><a href={tripConfig.links.festivalSite} target="_blank">Dreamstate SoCal — Official Site</a></li>
            <li><a href={tripConfig.links.festivalMap} target="_blank">Info / Map</a></li>
            <li><a href={tripConfig.links.reddit} target="_blank">Reddit: r/Dreamstate</a></li>
          </ul>
        </div>
      </section>
    </PasswordGate>
  );
}

function RSVPForm() {
  return (
    <form className="space-y-3" action={process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL} method="post" onSubmit={(e) => {
      // Enhance: send JSON via fetch to GAS URL
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form) as any);
      const url = (process as any).env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
      if (!url) {
        alert("Webhook URL not set. Ask the organizer to configure NEXT_PUBLIC_SHEETS_WEBHOOK_URL.");
        return;
      }
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(async (res) => {
        if (res.ok) {
          alert("Submitted! See the Google Sheet.");
          form.reset();
          localStorage.setItem("rsvp_name", data.name as string);
        } else {
          alert("Submission failed. Check the webhook.");
        }
      }).catch(() => alert("Network error. Check the webhook URL."));
    }}>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input name="name" required className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g., Bryan" />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Arrival Flight</label>
          <input name="arrivalFlight" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g., AS 338" />
        </div>
        <div>
          <label className="block text-sm mb-1">Arrival Time</label>
          <input name="arrivalTime" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g., Thu 11/20 6:10 PM" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Departure Flight</label>
          <input name="departureFlight" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g., AS 541" />
        </div>
        <div>
          <label className="block text-sm mb-1">Departure Time</label>
          <input name="departureTime" className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g., Sat 11/22 11:05 PM" />
        </div>
      </div>
      <button className="mt-2 rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow">
        Submit
      </button>
    </form>
  );
}
