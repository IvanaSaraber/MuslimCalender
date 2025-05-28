// app/agenda/page.tsx — vernieuwde styling in zachte, professionele app-stijl
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
    <main className="bg-[#FAF9F6] min-h-screen p-4 sm:p-6 md:p-8 max-w-5xl mx-auto font-sans">
      <h1 className="text-4xl font-semibold mb-6 text-center text-[#2D3A3A] tracking-tight">
        📅 Islamic Events Agenda
      </h1>

      {/* Zoekbalk */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Zoek op naam, type of stad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-3/4 lg:w-2/3 px-5 py-3 border border-[#E3E3E3] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B4C7B4] text-gray-700 bg-white"
        />
      </div>

      {/* Toggle-knoppen */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`p-3 rounded-xl border-2 transition shadow-sm flex items-center justify-center w-12 h-12 ${
            view === "calendar" ? "bg-[#B4C7B4] text-white border-[#B4C7B4]" : "text-gray-500 border-gray-300 bg-white"
          }`}
        >
          <CalendarDays size={22} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-3 rounded-xl border-2 transition shadow-sm flex items-center justify-center w-12 h-12 ${
            view === "list" ? "bg-[#B4C7B4] text-white border-[#B4C7B4]" : "text-gray-500 border-gray-300 bg-white"
          }`}
        >
          <ListIcon size={22} />
        </button>
      </div>

      {/* Weergave */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        {view === "calendar" ? (
          <CalendarView events={filteredEvents} />
        ) : (
          <ListView events={filteredEvents} />
        )}
      </div>
    </main>
  );
}
