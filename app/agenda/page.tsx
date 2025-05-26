import { CalendarView } from "../../components/CalendarView";
import { ListView } from "../../components/ListView";
import events from "../../data/events.json";

export default function HomePage() {
  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Islamic Events</h1>
      <CalendarView events={events} />
      <ListView events={events} />
    </main>
  );
}


