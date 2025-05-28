// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-700">
          MuslimCalender
        </Link>
        <div className="space-x-4">
          <Link href="/agenda" className="text-gray-700 hover:text-green-700">Agenda</Link>
          <Link href="/upload" className="text-gray-700 hover:text-green-700">Voeg event toe</Link>
        </div>
      </div>
    </nav>
  );
}
