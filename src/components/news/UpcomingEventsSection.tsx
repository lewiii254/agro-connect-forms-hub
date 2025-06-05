
import { CalendarDays } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { formatDate } from "@/utils/formatDate";

interface EventCardProps {
  date: string;
  title: string;
  location: string;
  description: string;
}

const EventCard = ({ date, title, location, description }: EventCardProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-agro-green">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-agro-lightgreen p-3 rounded-md text-center w-full md:w-32 flex-shrink-0">
          <span className="block text-agro-green font-bold">{date}</span>
        </div>
        <div>
          <h3 className="font-bold text-lg text-agro-blue mb-1">{title}</h3>
          <p className="text-agro-green mb-2 text-sm">
            <span className="inline-block mr-1">📍</span> {location}
          </p>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const UpcomingEventsSection = () => {
  const { content: eventContent, loading } = usePublishedContent('event');

  // Fallback events when no database content
  const fallbackEvents = [
    {
      id: 1,
      event_date: "2024-05-15",
      title: "Pesticide Safety Training Workshop",
      event_location: "Meru County Agricultural Hall",
      summary: "Join us for a comprehensive training session on safe pesticide application techniques and certification."
    },
    {
      id: 2,
      event_date: "2024-06-03",
      title: "Agricultural Innovation Expo",
      event_location: "Nchiiru Community Center",
      summary: "Discover the latest innovations in agricultural technology, fertilizers, and sustainable farming practices."
    },
    {
      id: 3,
      event_date: "2024-07-12",
      title: "Agro-Dealer Certification Program",
      event_location: "Virtual Event",
      summary: "Get certified as an agro-dealer through our comprehensive online training program. Registration required."
    }
  ];

  if (loading) {
    return (
      <section className="mt-16 mb-8">
        <div className="flex items-center mb-6">
          <CalendarDays className="text-agro-green mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  // Use database content if available, otherwise fallback
  const displayEvents = eventContent.length > 0 ? eventContent : fallbackEvents;

  return (
    <section className="mt-16 mb-8">
      <div className="flex items-center mb-6">
        <CalendarDays className="text-agro-green mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {displayEvents.slice(0, 3).map(event => (
          <EventCard
            key={event.id}
            date={event.event_date ? formatDate(event.event_date) : "TBD"}
            title={event.title}
            location={event.event_location || "Location TBD"}
            description={event.summary || "Event details coming soon."}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
