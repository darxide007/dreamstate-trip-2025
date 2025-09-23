import "./globals.css";
import Link from "next/link";
import { tripConfig } from "@/lib/config/trip.config";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Dreamstate Trip 2025",
  description: "Trip planner for the boys — clean neon trance vibe."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 bg-[#0b0f14]/70 backdrop-blur border-b border-white/5">
          <nav className="container-narrow py-3 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Sparkles className="w-5 h-5 text-neon-400" />
              <span className="font-semibold tracking-wide">Dreamstate Trip 2025</span>
            </Link>
            <div className="ml-auto flex gap-4 text-sm">
              <Link href="/itinerary">Itinerary</Link>
              <Link href="/lodging">Lodging</Link>
              <Link href="/budget">Budget</Link>
              <Link href="/packing">Packing</Link>
              <Link href="/logistics">Logistics</Link>
              <Link href="/links">Links</Link>
              <Link href="/fun">Fun</Link>
            </div>
          </nav>
        </header>
        <main className="container-narrow py-8">{children}</main>
        <footer className="container-narrow py-10 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Trip Crew · {tripConfig.city}</div>
        </footer>
      </body>
    </html>
  );
}
