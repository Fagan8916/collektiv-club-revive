import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type EventRow = {
  slug: string;
  title: string;
  tagline: string | null;
  event_date: string | null;
  event_date_label: string | null;
  event_time: string | null;
  location: string | null;
  attendees: string | null;
  paragraphs: string[] | null;
  topics: string[] | null;
  venue_notes: string | null;
  hero_image_url: string | null;
  gallery_images: string[] | null;
  status: string;
};

const DynamicMemberEvent = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("member_events")
        .select(
          "slug, title, tagline, event_date, event_date_label, event_time, location, attendees, paragraphs, topics, venue_notes, hero_image_url, gallery_images, status",
        )
        .eq("slug", slug)
        .maybeSingle();
      if (error) console.error("DynamicMemberEvent load error", error);
      setEvent((data as EventRow | null) ?? null);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <p className="text-collektiv-green">Loading event…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-6">
        <p className="text-collektiv-dark mb-4">This event isn't available.</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Back
        </Button>
      </div>
    );
  }

  const dateLabel = event.event_date_label || event.event_date || "";
  const isPast = event.status === "past";
  const heroImage =
    event.hero_image_url ||
    (event.gallery_images && event.gallery_images[0]) ||
    null;
  const gallery = event.gallery_images ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        {heroImage ? (
          <img src={heroImage} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-collektiv-green/30 to-collektiv-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-8 left-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-4 bg-collektiv-green text-white">
              {isPast ? "Past Event" : "Upcoming Event"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            {event.tagline && (
              <p className="text-xl text-white/90 max-w-3xl">{event.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {dateLabel && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-collektiv-green mt-1" />
                  <div>
                    <p className="font-semibold text-lg">Date</p>
                    <p className="text-muted-foreground">{dateLabel}</p>
                  </div>
                </div>
              )}

              {event.event_time && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-collektiv-green mt-1" />
                  <div>
                    <p className="font-semibold text-lg">Time</p>
                    <p className="text-muted-foreground">{event.event_time}</p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-collektiv-green mt-1" />
                  <div>
                    <p className="font-semibold text-lg">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              )}

              {event.attendees && (
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-collektiv-green mt-1" />
                  <div>
                    <p className="font-semibold text-lg">Attendees</p>
                    <p className="text-muted-foreground">{event.attendees}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {event.paragraphs && event.paragraphs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-collektiv-green mb-4">About the Event</h2>
                  <div className="space-y-4 text-muted-foreground">
                    {event.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {event.topics && event.topics.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                    {isPast ? "Topics Discussed" : "What We'll Cover"}
                  </h2>
                  <ul className="space-y-2 text-muted-foreground">
                    {event.topics.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-collektiv-green mt-1">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.venue_notes && (
                <div>
                  <h2 className="text-2xl font-bold text-collektiv-green mb-4">The Venue</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{event.venue_notes}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {gallery.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-collektiv-green mb-6">Event Gallery</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-lg group"
                >
                  <img
                    src={image}
                    alt={`${event.title} moment ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicMemberEvent;
