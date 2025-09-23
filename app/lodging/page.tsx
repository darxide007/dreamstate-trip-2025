import PasswordGate from "@/components/PasswordGate";
import { tripConfig } from "@/lib/config/trip.config";

export default function Page() {
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Lodging</h1>
        <p className="text-white/70 mb-4">Placeholder Airbnb link for now. Add final booking once chosen.</p>
        <a className="inline-block rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow"
           target="_blank" href={tripConfig.lodging.airbnbPlaceholder}>Open Airbnb</a>
      </div>
    </PasswordGate>
  );
}
