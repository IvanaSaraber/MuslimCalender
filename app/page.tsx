"use client";

import { useState } from "react";
import { CalendarView } from "../../components/CalendarView";
import { ListView } from "../../components/ListView";
import allEvents from "../../data/events.json";
import { CalendarDays, List as ListIcon, Search, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
    <main className="bg-[#fefaf5] min-h-screen px-4 py-6 max-w-5xl mx-auto">
      {/* Highlights */}
      <div className="grid grid-cols-3 gap-4 mb-8">
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

      {/* Toggle, zoek en upload */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
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
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c8f85]" size={16} />
          <input
            type="text"
            placeholder="Zoek..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-sm border border-[#e1d8cf] rounded-xl bg-white text-[#5f5247] placeholder-[#a09388] focus:outline-none"
          />
        </div>
        <Link
          href="/upload"
          className="flex items-center gap-1 text-[#5f5247] border border-[#e1d8cf] px-3 py-1.5 rounded-xl bg-white hover:bg-[#f3ece6] transition"
        >
          <PlusCircle size={18} /> <span className="text-sm">Voeg event toe</span>
        </Link>
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
