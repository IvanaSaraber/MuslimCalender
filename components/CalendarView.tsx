"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function CalendarView({ events }: { events: any[] }) {
  const calendarEvents = events.map((event) => ({
    title: event.EventName,
    date: event.Date,
  }));

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Kalenderweergave</h2>
      <div className="overflow-x-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          height="auto"
          fixedWeekCount={false}
          dayMaxEventRows={3}
          showNonCurrentDates={false}
          displayEventTime={false}
        />
      </div>
    </div>
  );
}
