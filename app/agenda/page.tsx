// app/agenda/page.tsx — met icon toggle, zoekfunctie en dynamische weergave + vernieuwde styling
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
    <main className="px-4 py-6 max-w-4xl mx-auto bg-neutral-50 min-h-screen rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-neutral-800">
        📅 Agenda
      </h1>

      {/* Zoekbalk */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Zoek op naam, type of stad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-sm"
        />
      </div>

      {/* Icon toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setView("calendar")}
          className={`p-3 rounded-full border transition ${
            view === "calendar" ? "bg-teal-500 text-white" : "text-gray-500 bg-white"
          }`}
        >
          <CalendarDays size={24} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-3 rounded-full border transition ${
            view === "list" ? "bg-teal-500 text-white" : "text-gray-500 bg-white"
          }`}
        >
          <ListIcon size={24} />
        </button>
      </div>

      {/* Dynamische weergave */}
      <div className="bg-white rounded-xl p-4 shadow">
        {view === "calendar" && <CalendarView events={filteredEvents} />}
        {view === "list" && <ListView events={filteredEvents} />}
      </div>
    </main>
  );
}
