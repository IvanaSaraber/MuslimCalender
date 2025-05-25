"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export function CalendarView({ events }: { events: any[] }) {
  const calendarEvents = events.map((event) => ({
    title: event.EventName,
    date: event.Date,
  }));

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Kalenderweergave</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </div>
  );
}

