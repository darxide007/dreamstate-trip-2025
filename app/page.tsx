import PasswordGate from "@/components/PasswordGate";
import Countdown from "@/components/Countdown";
import { tripConfig } from "@/lib/config/trip.config";
import RSVPForm from "@/components/RSVPForm";

export default function Home() {
  return (
    <PasswordGate>
      <section className="mb-8">
        <div className="card">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dreamstate SoCal 2025 — Trip Hub</h1>
          <p className="text-white/70">
            Long Beach, CA · Trip window {new Date(tripConfig.tripWindow.start).toLocaleDateString()}–
            {new Date(tripConfig.tripWindow.end).toLocaleDateString()} · Festival{" "}
            {new Date(tripConfig.festivalDays.start).toLocaleDateString()}–
            {new Date(tripConfig.festivalDays.end).toLocaleDateString()}
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
		  <p className="text-white/70 mb-4">
			Enter your name and flight details. This will post to our Google Sheet.
		  </p>
		  <RSVPForm />
		  <a
			href="/rsvps"
			className="inline-block mt-3 rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow"
		  >
			View RSVPs
		  </a>
		</div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href={tripConfig.links.festivalSite} target="_blank">Dreamstate SoCal — Official Site</a>
            </li>
            <li>
              <a href={tripConfig.links.festivalMap} target="_blank">Info / Map</a>
            </li>
            <li>
              <a href={tripConfig.links.reddit} target="_blank">Reddit: r/Dreamstate</a>
            </li>
          </ul>
        </div>
      </section>
    </PasswordGate>
  );
}
