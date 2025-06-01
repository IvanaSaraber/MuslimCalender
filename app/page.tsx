// app/page.tsx
"use client";

import { useState } from "react";
import { CalendarView } from "../components/CalendarView";
import { ListView } from "../components/ListView";
import allEvents from "../data/events.json";
import { CalendarDays, List as ListIcon, Search, PlusCircle } from "lucide-react";
import Link from "next/link";

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
    <main className="bg-[#fefaf5] min-h-screen px-4 py-6 max-w-5xl mx-auto relative">
      {/* Titel */}
      <h2 className="text-xl font-semibold text-[#5f5247] mb-4">
        Jouw islamitisch eventoverzicht
      </h2>

      {/* Floating button naar uploadform */}
      <Link
        href="/upload"
        className="fixed bottom-5 right-5 bg-[#c9b6a0] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#bba58e]"
      >
        <PlusCircle size={20} />
      </Link>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {filteredEvents.slice(0, 3).map((event, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-md text-center p-3"
          >
            <img
              src={event.imageUrl}
              alt={event.EventName}
              className="rounded-lg w-full h-28 object-cover mb-2"
            />
            <h3 className="text-[15px] font-semibold text-[#422c1b]">
              {event.EventName}
            </h3>
            <p className="text-sm text-[#7b5e48]">{event.Date}</p>
            <p className="text-sm text-[#7b5e48]">{event.City}</p>
          </div>
        ))}
      </div>

      {/* Toggle & zoekfunctie */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <button
          onClick={() => setView("calendar")}
          className={`p-2 rounded-xl transition ${
            view === "calendar"
              ? "bg-[#c9b6a0] text-white"
              : "bg-white border border-[#e1d8cf] text-[#5f5247]"
          }`}
        >
          <CalendarDays size={18} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-2 rounded-xl transition ${
            view === "list"
              ? "bg-[#c9b6a0] text-white"
              : "bg-white border border-[#e1d8cf] text-[#5f5247]"
          }`}
        >
          <ListIcon size={18} />
        </button>
        <div className="relative ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c8f85]" size={16} />
          <input
            type="text"
            placeholder="Zoek..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-sm border border-[#e1d8cf] rounded-xl bg-white text-[#5f5247] placeholder-[#a09388] focus:outline-none"
          />
        </div>
      </div>

      {/* Inhoud */}
      <div className="bg-white p-4 rounded-2xl shadow">
        {view === "calendar" ? (
          <CalendarView events={filteredEvents} />
        ) : (
          <ListView events={filteredEvents} />
        )}
      </div>
    </main>
  );
}
