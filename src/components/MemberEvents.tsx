
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MemberEvents = () => {
  // Placeholder events data - will be replaced with real data later
  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Pitch Night",
      date: "Coming soon",
      time: "Coming soon",
      location: "London",
      attendees: "50 attendees max",
      status: "upcoming",
      description: "Join us for an evening of innovative startup pitches and networking."
    },
    {
      id: 2,
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
      id: 3,
      title: "Loxa Stakeholders Update",
      date: "end June 2025",
      time: "",
      location: "London",
      attendees: "50 attendees max",
      status: "completed",
      description: "Stakeholder update meeting for Loxa investment."
    }
  ];

  const EventCard = ({ event, isPast = false }) => (
    <Card className={`hover:shadow-lg transition-shadow ${isPast ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-collektiv-green">{event.title}</CardTitle>
          <Badge variant={isPast ? "secondary" : "default"}>
            {isPast ? "Completed" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-600 text-sm">{event.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {event.attendees}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* No events state */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Events Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We're planning exciting events for our members. Stay tuned for updates on networking sessions, 
              investment workshops, and exclusive member gatherings.
            </p>
            <Badge variant="outline" className="mt-4">TBC - To Be Confirmed</Badge>
          </CardContent>
        </Card>
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

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-collektiv-green mb-6">Past Events</h3>
          <div className="grid gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberEvents;
