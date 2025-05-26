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
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Agenda</h1>

      {/* Zoekbalk */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Zoek op naam, type of stad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Icon toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`p-3 rounded-full border shadow transition ${
            view === "calendar"
              ? "bg-primary text-white scale-110"
              : "text-gray-500 bg-white"
          }`}
        >
          <CalendarDays size={26} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-3 rounded-full border shadow transition ${
            view === "list"
              ? "bg-primary text-white scale-110"
              : "text-gray-500 bg-white"
          }`}
        >
          <ListIcon size={26} />
        </button>
      </div>

      {/* Dynamische weergave */}
      {view === "calendar" && <CalendarView events={filteredEvents} />}
      {view === "list" && <ListView events={filteredEvents} />}
    </main>
  );
}
