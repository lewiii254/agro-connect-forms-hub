import { Calendar, MapPin, Clock } from "lucide-react";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const EventsSection = () => {
  const { content: eventContent, loading } = usePublishedContent('event');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <section className="bg-white rounded-2xl shadow-xl p-8 h-fit">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-100 rounded-xl">
            <Calendar className="text-red-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="text-gray-600 text-sm">Don't miss these opportunities</p>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-36 rounded-xl"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayEvents = eventContent.length > 0 ? eventContent : fallbackEvents;

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 h-fit">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-100 rounded-xl">
          <Calendar className="text-red-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 text-sm">Don't miss these opportunities</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {displayEvents.slice(0, 3).map((event) => (
          <article key={event.id} className="group border border-gray-100 rounded-xl p-5 hover:border-red-200 hover:bg-red-50/30 transition-all duration-300 hover:shadow-md">
            <div className="flex gap-4">
              {event.image_url && (
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden relative">
                  <div className={`w-full h-full ${!loadedImages[event.id] ? 'bg-gray-200 animate-pulse' : ''}`}>
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        loadedImages[event.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(event.id)}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 text-base">
                    {event.title}
                  </h3>
                  <Badge variant="outline" className="text-red-600 border-red-200 flex-shrink-0 text-xs">
                    Event
                  </Badge>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-red-500" />
                    <span className="font-medium">{event.event_date ? formatDate(event.event_date) : "TBD"}</span>
                  </div>
                  {event.event_location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-red-500" />
                      <span className="truncate">{event.event_location}</span>
                    </div>
                  )}
                </div>
                
                {event.summary && (
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {event.summary}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {displayEvents.length > 3 && (
        <div className="mt-6 text-center">
          <button className="text-red-600 hover:text-red-700 font-semibold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors">
            View All Events →
          </button>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
