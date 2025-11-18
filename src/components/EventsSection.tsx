import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EventsSection = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Collektiv Member and Founder Meet Up",
      date: "9th October 2024",
      location: "The Woodins Shades, 212 Bishopsgate, London",
      description: "An evening of networking, insights sharing, and beers on us! Members and founders came together for great conversation.",
      image: "/lovable-uploads/collektiv-meetup-featured.jpg",
      slug: "collektiv-meetup-oct-2024"
    },
    {
      id: 2,
      title: "Plug and Play Tirana Expo 2024",
      date: "October 16-17, 2024",
      location: "Pyramid of Tirana, Albania",
      description: "The grand finale of the Plug and Play Tirana Accelerator Program - celebrating Albania's emerging startup ecosystem.",
      image: "/lovable-uploads/tirana-expo-featured.jpg",
      slug: "tirana-expo-2024"
    },
    {
      id: 3,
      title: "Catalyst: Dinner @ London",
      date: "October 14, 2024",
      location: "Dishoom King's Cross, London",
      description: "A roaming event series for founders, operators, and builders shaping what it means to build AI companies today.",
      image: "/lovable-uploads/propane-catalyst-featured.jpg",
      slug: "propane-catalyst-2024"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-collektiv-green">Recent Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest gatherings bringing together investors, founders, and innovators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {featuredEvents.map((event) => (
            <Link 
              key={event.id} 
              to={`/events/${event.slug}`}
              className="group"
            >
              <Card className="cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden h-full">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-collektiv-green text-white">
                    Completed
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-collektiv-green group-hover:text-collektiv-dark transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-collektiv-green font-medium group-hover:text-collektiv-dark transition-colors">
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/events" 
            className="inline-flex items-center text-collektiv-green hover:text-collektiv-dark font-semibold text-lg transition-colors"
          >
            View All Events <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
