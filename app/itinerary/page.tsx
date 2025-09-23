import Countdown from "@/components/Countdown";
import { tripConfig } from "@/lib/config/trip.config";
import PasswordGate from "@/components/PasswordGate";

export default function Page() {
  return (
    <PasswordGate>
      <div className="card mb-6">
        <h1 className="text-2xl font-bold mb-2">Itinerary</h1>
        <p className="text-white/70">Trip window {tripConfig.tripWindow.start} → {tripConfig.tripWindow.end}. Festival {tripConfig.festivalDays.start} → {tripConfig.festivalDays.end}.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-2">Countdown to Day 1</h2>
          <Countdown to={`${tripConfig.festivalDays.start}T17:00:00`} />
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Schedule (placeholder)</h2>
          <ul className="space-y-2 text-sm">
            <li>Thu 11/20 — Arrivals & check-in</li>
            <li>Fri 11/21 — Festival Day 1</li>
            <li>Sat 11/22 — Festival Day 2 & departures</li>
          </ul>
        </div>
      </div>
    </PasswordGate>
  );
}
