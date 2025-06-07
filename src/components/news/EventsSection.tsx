
import { Calendar, MapPin, Clock } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";

const EventsSection = () => {
  const { content: eventContent, loading } = usePublishedContent('event');

  const fallbackEvents = [
    {
      id: 1,
      title: "Pesticide Safety Training Workshop",
      event_date: "2024-05-15",
      event_location: "Meru County Agricultural Hall",
      summary: "Join us for a comprehensive training session on safe pesticide application techniques.",
      image_url: "/public/SSPTraining1.png"
    },
    {
      id: 2,
      title: "Agricultural Innovation Expo",
      event_date: "2024-06-03",
      event_location: "Nchiiru Community Center", 
      summary: "Discover the latest innovations in agricultural technology and sustainable farming.",
      image_url: "/public/SSPTraining2.png"
    }
  ];

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-red-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayEvents = eventContent.length > 0 ? eventContent : fallbackEvents;

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <Calendar className="text-red-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 text-sm">Don't miss these important events</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayEvents.slice(0, 3).map((event) => (
          <div key={event.id} className="group border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:bg-red-50/30 transition-all">
            <div className="flex gap-4">
              {event.image_url && (
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <Badge variant="outline" className="text-red-600 border-red-200 flex-shrink-0">
                    Event
                  </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-red-500" />
                    <span>{event.event_date ? formatDate(event.event_date) : "TBD"}</span>
                  </div>
                  {event.event_location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-red-500" />
                      <span className="truncate">{event.event_location}</span>
                    </div>
                  )}
                </div>
                
                {event.summary && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {event.summary}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayEvents.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
            View All Events →
          </button>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
