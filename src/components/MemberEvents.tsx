import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

type DbEvent = {
  id: string;
  slug: string;
  title: string;
  event_date: string | null;
  event_date_label: string | null;
  event_time: string | null;
  location: string | null;
  attendees: string | null;
  description: string | null;
  hero_image_url: string | null;
  status: string;
  sort_order: number;
};

type DisplayEvent = {
  id: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  status: "upcoming" | "completed";
  description: string;
  slug?: string;
  image?: string;
  source: "db" | "static";
};

const MemberEvents = () => {
  const navigate = useNavigate();
  const [dbEvents, setDbEvents] = useState<DbEvent[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("member_events")
        .select(
          "id, slug, title, event_date, event_date_label, event_time, location, attendees, description, hero_image_url, status, sort_order",
        )
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("event_date", { ascending: false, nullsFirst: false });
      if (error) {
        console.error("MemberEvents: failed to load events", error);
        return;
      }
      setDbEvents((data as DbEvent[]) ?? []);
    };
    load();
  }, []);

  const dbToDisplay = (e: DbEvent): DisplayEvent => ({
    id: e.id,
    title: e.title,
    date: e.event_date_label || e.event_date || "TBC",
    time: e.event_time || "",
    location: e.location || "",
    attendees: e.attendees || "",
    status: e.status === "past" ? "completed" : "upcoming",
    description: e.description || "",
    slug: e.slug,
    image: e.hero_image_url || undefined,
    source: "db",
  });

  // Static (hardcoded) past events — kept for backwards compatibility
  const staticPastEvents: DisplayEvent[] = [
    {
      id: "static-pizza",
      title: "Pizza, Pints & Great Conversations",
      date: "February 20, 2025",
      time: "6:30 PM onwards",
      location: "The White Bear, Farringdon, London",
      attendees: "20+ members",
      status: "completed",
      description:
        "An intimate evening of wood-fired pizza, craft pints, and wide-ranging conversations covering investment opportunities, ethical investing, AI, and general life catch-ups.",
      slug: "pizza-pints-feb-2025",
      image: "/lovable-uploads/pizza-meetup-food.webp",
      source: "static",
    },
    {
      id: "static-meetup",
      title: "Collektiv Member and Founder Meet Up",
      date: "9th October 2025",
      time: "6:00 PM onwards",
      location: "The Woodins Shades, 212 Bishopsgate, London",
      attendees: "20+ members and founders",
      status: "completed",
      description:
        "An evening of networking, insights sharing, and beers on us! Members and founders came together for great conversation.",
      slug: "collektiv-meetup-oct-2024",
      image: "/lovable-uploads/collektiv-meetup-featured.jpg",
      source: "static",
    },
    {
      id: "static-tirana",
      title: "Plug and Play Tirana Expo 2025",
      date: "October 16-17, 2025",
      time: "",
      location: "Pyramid of Tirana, Albania",
      attendees: "80+ international attendees",
      status: "completed",
      description:
        "The grand finale of the Plug and Play Tirana Accelerator Program - celebrating Albania's emerging startup ecosystem.",
      slug: "tirana-expo-2024",
      image: "/lovable-uploads/tirana-expo-featured.jpg",
      source: "static",
    },
    {
      id: "static-catalyst",
      title: "Catalyst: Dinner @ London",
      date: "October 14, 2025",
      time: "6:30 PM - 9:30 PM",
      location: "Dishoom King's Cross, London",
      attendees: "15 attendees",
      status: "completed",
      description:
        "A roaming event series for founders, operators, and builders shaping what it means to build AI companies today. Gathering top minds across product, technology, go-to-market, and investment — powered by Propane.",
      slug: "propane-catalyst-2024",
      image: "/lovable-uploads/propane-catalyst-featured.jpg",
      source: "static",
    },
    {
      id: "static-loxa",
      title: "Loxa Stakeholders Update",
      date: "end June 2025",
      time: "",
      location: "London",
      attendees: "",
      status: "completed",
      description: "Stakeholder update meeting for Loxa investment.",
      source: "static",
    },
  ];

  const displayedDb = dbEvents.map(dbToDisplay);
  const upcomingEvents = displayedDb.filter((e) => e.status === "upcoming");
  const pastEvents = [
    ...displayedDb.filter((e) => e.status === "completed"),
    ...staticPastEvents,
  ];

  const FeaturedEventCard = ({ event }: { event: DisplayEvent }) => {
    const handleClick = () => {
      if (event.slug) navigate(`/members/events/${event.slug}`);
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
            {event.status === "upcoming" ? "Upcoming" : "Completed"}
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

            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            )}

            {event.attendees && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {event.attendees}
              </div>
            )}
          </div>

          {event.slug && (
            <div className="flex items-center gap-2 text-collektiv-green font-semibold text-sm group-hover:gap-3 transition-all">
              <span>View Event Details</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const EventCard = ({
    event,
    isPast = false,
  }: {
    event: DisplayEvent;
    isPast?: boolean;
  }) => {
    const isClickable = !!event.slug;

    const handleClick = () => {
      if (isClickable) navigate(`/members/events/${event.slug}`);
    };

    return (
      <Card
        className={`hover:shadow-lg transition-shadow ${isPast ? "opacity-90" : ""} ${isClickable ? "cursor-pointer hover:scale-[1.02] transition-transform" : ""}`}
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

            {event.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            )}

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

  const featuredUpcoming = upcomingEvents.filter((e) => e.image && e.slug);
  const otherUpcoming = upcomingEvents.filter((e) => !e.image || !e.slug);
  const featuredPast = pastEvents.filter((e) => e.image && e.slug);
  const otherPast = pastEvents.filter((e) => !e.image || !e.slug);

  return (
    <div className="space-y-12">
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-collektiv-green mb-6">Upcoming Events</h3>
          {featuredUpcoming.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {featuredUpcoming.map((event) => (
                <FeaturedEventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          {otherUpcoming.length > 0 && (
            <div className="grid gap-6">
              {otherUpcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-collektiv-green mb-2">Past Events</h3>
            <p className="text-muted-foreground">
              Click to explore photos, details and highlights from our community gatherings
            </p>
          </div>

          {featuredPast.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {featuredPast.map((event) => (
                <FeaturedEventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {otherPast.length > 0 && (
            <div className="grid gap-6">
              {otherPast.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* No events state */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Events Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're planning exciting events for our members. Stay tuned for updates on networking
              sessions, investment workshops, and exclusive member gatherings.
            </p>
            <Badge variant="outline" className="mt-4">
              TBC - To Be Confirmed
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberEvents;
