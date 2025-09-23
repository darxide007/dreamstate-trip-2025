import PasswordGate from "@/components/PasswordGate";

export default function Page() {
  return (
    <PasswordGate>
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Fun & Media</h1>
        <p className="text-white/70">Drop a Google Photos/Drive album link here later. Add memes, playlists, and inside jokes.</p>
      </div>
    </PasswordGate>
  );
}
