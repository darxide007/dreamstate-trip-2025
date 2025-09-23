import PasswordGate from "@/components/PasswordGate";
import { tripConfig } from "@/lib/config/trip.config";

export default function Page() {
  const links = tripConfig.links;
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-3">Key Links</h1>
        <ul className="space-y-2">
          <li><a target="_blank" href={links.festivalSite}>Official Site</a></li>
          <li><a target="_blank" href={links.festivalMap}>Info / Map</a></li>
          <li><a target="_blank" href={links.reddit}>Reddit Community</a></li>
        </ul>
      </div>
    </PasswordGate>
  );
}
