import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const navigate = useNavigate();

  const pastEvents = [
    {
      id: 1,
      title: "Collektiv Member and Founder Meet Up",
      date: "9th October 2025",
      time: "6:00 PM onwards",
      location: "The Woodins Shades, 212 Bishopsgate, London",
      attendees: "20+ members and founders",
      description: "An evening of networking, insights sharing, and beers on us! Members and founders came together for great conversation.",
      slug: "collektiv-meetup-oct-2024",
      image: "/lovable-uploads/collektiv-meetup-featured.jpg"
    },
    {
      id: 2,
      title: "Plug and Play Tirana Expo 2025",
      date: "October 16-17, 2025",
      location: "Pyramid of Tirana, Albania",
      attendees: "80+ international attendees",
      description: "The grand finale of the Plug and Play Tirana Accelerator Program - celebrating Albania's emerging startup ecosystem.",
      slug: "tirana-expo-2024",
      image: "/lovable-uploads/tirana-expo-featured.jpg"
    },
    {
      id: 3,
      title: "Catalyst: Dinner @ London",
      date: "October 14, 2025",
      time: "6:30 PM - 9:30 PM",
      location: "Dishoom King's Cross, London",
      attendees: "15 attendees",
      description: "A roaming event series for founders, operators, and builders shaping what it means to build AI companies today. Gathering top minds across product, technology, go-to-market, and investment — powered by Propane.",
      slug: "propane-catalyst-2024",
      image: "/lovable-uploads/propane-catalyst-featured.jpg"
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: "Startup Pitch Night",
      date: "Coming soon",
      time: "Coming soon",
      location: "London",
      attendees: "50 attendees max",
      description: "Join us for an evening of innovative startup pitches and networking."
    },
    {
      id: 5,
      title: "Investment Strategy Workshop",
      date: "Coming soon",
      time: "Coming soon",
      location: "London",
      attendees: "50 attendees max",
      description: "Learn advanced investment strategies from industry experts."
    }
  ];

  const FeaturedEventCard = ({ event }) => {
    const handleClick = () => {
      navigate(`/events/${event.slug}`);
    };

    return (
      <Card 
        className="cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden group"
        onClick={handleClick}
      >
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
          <CardTitle className="text-xl text-collektiv-green">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">{event.description}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
            {event.attendees && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{event.attendees}</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-collektiv-green font-medium pt-2">
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const EventCard = ({ event }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-collektiv-green">{event.title}</CardTitle>
          <Badge variant="secondary">Upcoming</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          {event.attendees && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{event.attendees}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold mb-6 text-white">Our Events</h1>
              <p className="text-xl text-white/80">
                Connect with fellow investors, founders, and innovators at our exclusive events. 
                From intimate dinners to large-scale expos, we create meaningful networking opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-collektiv-green">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <FeaturedEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-collektiv-green">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-collektiv-green text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Join Our Next Event?</h2>
            <p className="text-xl mb-8 text-green-100">
              Become a member to get exclusive access to all our events and networking opportunities.
            </p>
            <Link to="/membership" className="btn-primary bg-white text-collektiv-green hover:bg-gray-100">
              Join Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
