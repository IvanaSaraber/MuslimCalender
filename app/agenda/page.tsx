// app/agenda/page.tsx — hersteld naar fijne middenstijl, met zoekicoon en zachte styling
"use client";

import { useState } from "react";
import { CalendarView } from "../../components/CalendarView";
import { ListView } from "../../components/ListView";
import allEvents from "../../data/events.json";
import { CalendarDays, List as ListIcon, Search } from "lucide-react";

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
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Agenda</h1>

      {/* Zoekbalk met icoon */}
      <div className="relative flex justify-center mb-6">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Zoek op naam, type of stad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-gray-800"
        />
      </div>

      {/* Icon toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`p-3 rounded-full border shadow transition ${
            view === "calendar"
              ? "bg-neutral-800 text-white"
              : "text-gray-500 bg-white"
          }`}
        >
          <CalendarDays size={24} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-3 rounded-full border shadow transition ${
            view === "list"
              ? "bg-neutral-800 text-white"
              : "text-gray-500 bg-white"
          }`}
        >
          <ListIcon size={24} />
        </button>
      </div>

      {/* Dynamische weergave */}
      {view === "calendar" && <CalendarView events={filteredEvents} />}
      {view === "list" && <ListView events={filteredEvents} />}
    </main>
  );
}
