export function ListView({ events }: { events: any[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Lijstweergave</h2>
      <ul className="space-y-4">
        {events.map((event, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{event.EventName}</h3>
            <p className="text-sm text-gray-600">
              {event.Date} {event.StartTime && `om ${event.StartTime}`}
            </p>
            <p>{event.Description}</p>
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.EventName}
                className="mt-2 w-full max-w-xs rounded"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

