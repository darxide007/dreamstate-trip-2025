import PasswordGate from "@/components/PasswordGate";
import { tripConfig } from "@/lib/config/trip.config";

export default function Page() {
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-3">Packing List</h1>
        <ul className="list-disc list-inside space-y-2">
          {tripConfig.packingList.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </PasswordGate>
  );
}
