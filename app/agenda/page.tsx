// app/agenda/page.tsx — met icon toggle, zoekfunctie en dynamische weergave
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

      {/* Icon toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`p-2 rounded-full border transition ${
            view === "calendar" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          <CalendarDays size={24} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-2 rounded-full border transition ${
            view === "list" ? "bg-primary text-white" : "text-gray-600"
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
