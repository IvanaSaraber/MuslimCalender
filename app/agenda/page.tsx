// app/agenda/page.tsx — vernieuwd met app-achtige layout en styling
"use client";

import { useState } from "react";
import { CalendarView } from "../../components/CalendarView";
import { ListView } from "../../components/ListView";
import allEvents from "../../data/events.json";
import { CalendarDays, List as ListIcon } from "lucide-react";

export default function AgendaPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "calendar">("calendar");

  const filteredEvents = allEvents.filter((event) => {
    const q = query.toLowerCase();
    return (
      event.EventName.toLowerCase().includes(q) ||
      event.EventType?.toLowerCase().includes(q) ||
      event.City?.toLowerCase().includes(q)
    );
  });

  return (
    <main className="px-4 pt-6 pb-24 max-w-4xl mx-auto bg-nude text-gray-800 min-h-screen">
      {/* Titel */}
      <h1 className="text-xl font-semibold mb-4 text-center">Agenda van Evenementen</h1>

      {/* Zoekbalk */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="🔍 Zoek op naam, type of stad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* View toggle icons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`p-3 rounded-xl border transition shadow-sm ${
            view === "calendar" ? "bg-primary text-white" : "bg-white text-gray-500"
          }`}
        >
          <CalendarDays size={24} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-3 rounded-xl border transition shadow-sm ${
            view === "list" ? "bg-primary text-white" : "bg-white text-gray-500"
          }`}
        >
          <ListIcon size={24} />
        </button>
      </div>

      {/* Dynamische weergave */}
      <div className="rounded-xl overflow-hidden">
        {view === "calendar" && <CalendarView events={filteredEvents} />}
        {view === "list" && <ListView events={filteredEvents} />}
      </div>
    </main>
  );
}
