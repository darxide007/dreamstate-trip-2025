import PasswordGate from "@/components/PasswordGate";

export default function Page() {
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Logistics</h1>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Meet-up point: TBD</li>
          <li>Rides: Carpool sign-up via group chat</li>
          <li>Parking: Check venue guidance (rideshare suggested)</li>
          <li>Emergency contact & check-in schedule: TBD</li>
        </ul>
      </div>
    </PasswordGate>
  );
}
