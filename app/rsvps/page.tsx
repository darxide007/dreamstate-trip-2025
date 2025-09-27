import PasswordGate from "@/components/PasswordGate";
import RsvpTable from "@/components/RsvpTable";

export default function Page() {
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">RSVPs & Flights</h1>
        <p className="text-white/70 mb-4">
          Live list from Google Sheets.
        </p>
        <RsvpTable />
      </div>
    </PasswordGate>
  );
}
