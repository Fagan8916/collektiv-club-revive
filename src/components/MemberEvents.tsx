
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MemberEvents = () => {
  // Upcoming events data
  const upcomingEvents = [
    {
      id: 2,
      title: "Startup Pitch Night",
      date: "Coming soon",
      time: "Coming soon",
      location: "London",
      attendees: "50 attendees max",
      status: "upcoming",
      description: "Join us for an evening of innovative startup pitches and networking."
    },
    {
      id: 3,
      title: "Investment Strategy Workshop",
      date: "Coming soon",
      time: "Coming soon",
      location: "London",
      attendees: "50 attendees max",
      status: "upcoming",
      description: "Learn advanced investment strategies from industry experts."
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: "Collektiv Member and Founder Meet Up",
      date: "9th October 2024",
      time: "6:00 PM onwards",
      location: "The Woodins Shades, 212 Bishopsgate, London",
      attendees: "20+ members and founders",
      status: "completed",
      description: "An evening of networking, insights sharing, and beers on us! Members and founders came together for great conversation.",
      slug: "collektiv-meetup-oct-2024",
      image: "/lovable-uploads/collektiv-meetup-featured.jpg"
    },
    {
      id: 4,
      title: "Plug and Play Tirana Expo 2024",
      date: "October 16-17, 2024",
      time: "",
      location: "Pyramid of Tirana, Albania",
      attendees: "80+ international attendees",
      status: "completed",
      description: "The grand finale of the Plug and Play Tirana Accelerator Program - celebrating Albania's emerging startup ecosystem.",
      slug: "tirana-expo-2024",
      image: "/lovable-uploads/tirana-expo-featured.jpg"
    },
    {
      id: 3,
      title: "Loxa Stakeholders Update",
      date: "end June 2025",
      time: "",
      location: "London",
      attendees: "",
      status: "completed",
      description: "Stakeholder update meeting for Loxa investment."
    }
  ];

  const navigate = useNavigate();

  const FeaturedEventCard = ({ event }) => {
    const handleClick = () => {
      navigate(`/members/events/${event.slug}`);
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
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {event.date}
            </div>
            
            {event.time && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
            
            {event.attendees && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.attendees}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-collektiv-green font-semibold text-sm group-hover:gap-3 transition-all">
            <span>View Event Details</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const EventCard = ({ event, isPast = false }) => {
    const isClickable = isPast && event.slug;
    
    const handleClick = () => {
      if (isClickable) {
        navigate(`/members/events/${event.slug}`);
      }
    };

    return (
      <Card 
        className={`hover:shadow-lg transition-shadow ${isPast ? 'opacity-75' : ''} ${isClickable ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''}`}
        onClick={handleClick}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-collektiv-green">{event.title}</CardTitle>
            <Badge variant={isPast ? "secondary" : "default"}>
              {isPast ? "Completed" : "Upcoming"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">{event.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {event.date}
            </div>
            
            {event.time && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
            
            {event.attendees && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.attendees}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-12">
      {/* Past Events - Featured at Top */}
      {pastEvents.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-collektiv-green mb-2">Past Events</h3>
            <p className="text-muted-foreground">Click to explore photos, details and highlights from our community gatherings</p>
          </div>
          
          {/* Featured Events with Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {pastEvents
              .filter(event => event.image && event.slug)
              .map((event) => (
                <FeaturedEventCard key={event.id} event={event} />
              ))}
          </div>
          
          {/* Other Past Events without Images */}
          <div className="grid gap-6">
            {pastEvents
              .filter(event => !event.image || !event.slug)
              .map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-collektiv-green mb-6">Upcoming Events</h3>
          <div className="grid gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* No events state */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Events Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're planning exciting events for our members. Stay tuned for updates on networking sessions, 
              investment workshops, and exclusive member gatherings.
            </p>
            <Badge variant="outline" className="mt-4">TBC - To Be Confirmed</Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberEvents;
