const EventCalendar = ({ events, onEventClick }) => {
    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});
  
    // Generate calendar days (simplified version)
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const firstDayOfMonth = new Date(year, month, 1).getDay();
  
    const days = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const dateString = date.toISOString().split("T")[0];
      const isToday =
        i + 1 === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
  
      return {
        date: i + 1,
        dateString,
        events: eventsByDate[dateString] || [],
        isToday,
      };
    });
  
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{monthName}</h2>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-50 text-center py-2 font-medium text-gray-500 text-sm"
            >
              {day}
            </div>
          ))}
  
          {/* Empty cells for days before the 1st of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white min-h-32 p-1"></div>
          ))}
  
          {/* Calendar days */}
          {days.map((day) => (
            <div
              key={day.date}
              className={`bg-white min-h-32 p-1 ${
                day.isToday ? "ring-2 ring-indigo-500 ring-inset" : ""
              }`}
            >
              <div
                className={`text-right p-1 mb-1 ${
                  day.isToday
                    ? "font-bold text-indigo-600"
                    : "font-medium text-gray-700"
                }`}
              >
                {day.date}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-24">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded cursor-pointer truncate flex items-center"
                    style={{
                      backgroundColor: `${event.color}15`,
                      borderLeft: `3px solid ${event.color}`,
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <span className="font-medium" style={{ color: event.color }}>
                      {event.time}
                    </span>
                    <span className="ml-1 truncate">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default EventCalendar;