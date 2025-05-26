// app/page.tsx (Nieuwe startpagina met navigatie)
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-bold">MuslimCalender</h1>
      <p className="text-lg text-gray-700">
        Ontdek islamitische evenementen in jouw buurt. Bekijk iftars, lezingen, bazaars en meer — overzichtelijk in lijst-, kalender- of kaartweergave.
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:justify-center">
        <Link href="/agenda" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
          Bekijk Agenda
        </Link>
        <Link href="/recent" className="bg-white border px-6 py-3 rounded-xl hover:bg-gray-100 transition">
          Meest Recent Toegevoegd
        </Link>
      </div>
    </main>
  );
}

// Nieuwe routes zullen o.a. zijn:
// - /agenda (pagina met lijst/kalender switch)
// - /recent (highlightpagina)
// - /upload (voor flyer-invoer)
// Deze kunnen we stapsgewijs implementeren met component-optimalisatie & performance caching.


