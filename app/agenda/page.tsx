// app/agenda/page.tsx — vernieuwde styling met nude-tinten en neutrale zoekicoon
"use client";

import { useState } from "react";
import { CalendarView } from "../../components/CalendarView";
import { ListView } from "../../components/ListView";
import allEvents from "../../data/events.json";
import { List as ListIcon, Search } from "lucide-react";

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
    <main className="p-4 max-w-4xl mx-auto bg-[#fdf9f5] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#453c36] text-center font-serif">
        Agenda
      </h1>

      {/* Zoekbalk */}
      <div className="flex justify-center mb-6 relative">
        <input
          type="text"
          placeholder="Zoek op naam, type of stad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 border border-[#ddd2c9] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e2cfc3] bg-white text-[#453c36] placeholder-[#8b817a]"
        />
        <Search size={20} className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#8b817a]" />
      </div>

      {/* Icon toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`p-3 rounded-full border border-[#ddd2c9] shadow transition duration-200 ${
            view === "calendar" ? "bg-[#e2cfc3] text-white scale-105" : "text-[#453c36] bg-white"
          }`}
        >
          📅
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-3 rounded-full border border-[#ddd2c9] shadow transition duration-200 ${
            view === "list" ? "bg-[#e2cfc3] text-white scale-105" : "text-[#453c36] bg-white"
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
