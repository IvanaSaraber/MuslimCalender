"use client";

import { useState } from "react";
import { CalendarView } from "../../components/CalendarView";
import { ListView } from "../../components/ListView";
import allEvents from "../../data/events.json";

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
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Agenda</h1>

      {/* Zoekbalk */}
      <input
        type="text"
        placeholder="Zoek op naam, type of stad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 border rounded shadow-sm"
      />

      {/* Toggle-knoppen */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`px-4 py-2 rounded ${
            view === "calendar"
              ? "bg-green-600 text-white"
              : "bg-white border text-gray-700"
          }`}
        >
          Kalender
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded ${
            view === "list"
              ? "bg-green-600 text-white"
              : "bg-white border text-gray-700"
          }`}
        >
          Lijst
        </button>
      </div>

      {/* Dynamische weergave */}
      {view === "calendar" ? (
        <CalendarView events={filteredEvents} />
      ) : (
        <ListView events={filteredEvents} />
      )}
    </main>
  );
}
