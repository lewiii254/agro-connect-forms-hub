
import { CalendarDays } from "lucide-react";

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
  const events = [
    {
      id: 1,
      date: "May 15, 2024",
      title: "Pesticide Safety Training Workshop",
      location: "Meru County Agricultural Hall",
      description: "Join us for a comprehensive training session on safe pesticide application techniques and certification."
    },
    {
      id: 2,
      date: "June 3, 2024",
      title: "Agricultural Innovation Expo",
      location: "Nchiiru Community Center",
      description: "Discover the latest innovations in agricultural technology, fertilizers, and sustainable farming practices."
    },
    {
      id: 3,
      date: "July 12, 2024",
      title: "Agro-Dealer Certification Program",
      location: "Virtual Event",
      description: "Get certified as an agro-dealer through our comprehensive online training program. Registration required."
    }
  ];

  return (
    <section className="mt-16 mb-8">
      <div className="flex items-center mb-6">
        <CalendarDays className="text-agro-green mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {events.map(event => (
          <EventCard
            key={event.id}
            date={event.date}
            title={event.title}
            location={event.location}
            description={event.description}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
