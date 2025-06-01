"use client";

import Link from "next/link";

export default function UploadEventPage() {
  return (
    <main className="min-h-screen bg-[#fefaf5] p-6 max-w-xl mx-auto flex flex-col items-center justify-start">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#422c1b] mb-2">
          Voeg een event toe aan de agenda
        </h1>
        <p className="text-[#7b5e48] text-sm">
          Kies hoe je het event wilt toevoegen
        </p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <Link href="/upload-event/manual">
          <div className="bg-white p-5 rounded-xl shadow border border-[#e1d8cf] hover:bg-[#f3eee9] transition cursor-pointer">
            <h2 className="font-semibold text-[#422c1b] mb-1">Handmatig invoeren</h2>
            <p className="text-sm text-[#7b5e48]">
              Vul alle details zelf in met begeleidende uitleg.
            </p>
          </div>
        </Link>

        <Link href="/upload-event/flyer">
          <div className="bg-white p-5 rounded-xl shadow border border-[#e1d8cf] hover:bg-[#f3eee9] transition cursor-pointer">
            <h2 className="font-semibold text-[#422c1b] mb-1">Alleen flyer uploaden</h2>
            <p className="text-sm text-[#7b5e48]">
              Upload een flyer zonder extra informatie.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
