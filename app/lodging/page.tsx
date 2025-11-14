import PasswordGate from "@/components/PasswordGate";
import { tripConfig } from "@/lib/config/trip.config";

export default function Page() {
  const { lodging } = tripConfig;
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Lodging</h1>
        <p className="text-white/70 mb-4">
          Here’s our current lodging pick. Tap the button to view details, photos, and booking info.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-white/60">Property</div>
            <div className="text-lg font-semibold">
              {lodging.name || "Marriott Homes & Villas — Long Beach"}
            </div>
            <div className="mt-2 text-white/70">
              Address:{" "}
              <a
                className="underline hover:text-white"
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps?q=West+Ocean+Boulevard+200,+Long+Beach,+CA,+USA,+90802-4601"
              >
                West Ocean Boulevard 200, Long Beach, CA, USA, 90802-4601
              </a>
            </div>
            <a
              className="inline-block mt-3 rounded-lg bg-neon-500 hover:bg-neon-400 text-black font-semibold px-4 py-2 shadow-glow"
              target="_blank"
              href={lodging.url}
              rel="noreferrer"
            >
              Open Listing
            </a>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/60">
          Tip: after we book, we can add check-in/out times, parking notes, and door code here.
        </div>
      </div>
    </PasswordGate>
  );
}
