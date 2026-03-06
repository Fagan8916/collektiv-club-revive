import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PizzaPintsFeb2025 = () => {
  const navigate = useNavigate();

  const eventImages = [
    "/lovable-uploads/pizza-meetup-food.webp",
    "/lovable-uploads/pizza-meetup-venue.jpg",
    "/lovable-uploads/pizza-meetup-bar.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src="/lovable-uploads/pizza-meetup-food.webp" 
          alt="Pizza, Pints and Great Conversations"
          className="w-full h-full object-cover"
        />
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
            <Badge className="mb-4 bg-collektiv-green text-white">Past Event</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pizza, Pints & Great Conversations
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              An intimate February gathering of Collektiv members over wood-fired pizza and craft pints at The White Bear, Farringdon
            </p>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Date</p>
                  <p className="text-muted-foreground">Thursday, February 20, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Time</p>
                  <p className="text-muted-foreground">6:30 PM onwards</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Location</p>
                  <p className="text-muted-foreground">The White Bear, Farringdon, London (Private Room)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Attendees</p>
                  <p className="text-muted-foreground">20+ members</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">About the Event</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our February member meetup brought together over 20 Collektiv members for an evening of wood-fired pizza, craft pints, and wide-ranging conversations in a private room at The White Bear in Farringdon — one of London's hidden gem pubs tucked away in the backstreets of Clerkenwell.
                  </p>
                  <p>
                    The relaxed, intimate setting was the perfect backdrop for open and honest discussions spanning the full spectrum of what's on members' minds. From live investment opportunities and deal flow, to the growing importance of ethical and impact investing, the conversation flowed as freely as the drinks.
                  </p>
                  <p>
                    A highlight of the evening was a spirited discussion around AI — how it's reshaping industries, creating new investment opportunities, and what it means for founders and operators building in this space. Members shared first-hand experiences of integrating AI into their businesses and debated where the real value lies beyond the hype.
                  </p>
                  <p>
                    But it wasn't all business. True to the spirit of Collektiv, there was plenty of time for general life catch-ups, personal updates, and the kind of genuine connection that only happens when you get the right people in a room together. New friendships were formed and existing ones deepened over slices of margherita and pints of craft ale.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">Topics Discussed</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Live investment opportunities and current deal flow across the portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Ethical and impact investing — aligning returns with values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>AI trends, opportunities, and real-world applications in startups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Founder updates and portfolio company progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>General life catch-ups and community bonding</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">The Venue</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The White Bear in Farringdon provided the ideal setting — a characterful London pub with a private room that gave us the space for proper conversation away from the crowd. With its cosy atmosphere, excellent pizza from the wood-fired oven, and a well-stocked bar, it's quickly becoming a favourite Collektiv haunt.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <div>
          <h2 className="text-3xl font-bold text-collektiv-green mb-6">Event Gallery</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {eventImages.map((image, index) => (
              <div key={index} className="relative aspect-video overflow-hidden rounded-lg group">
                <img 
                  src={image} 
                  alt={`Pizza, Pints & Great Conversations moment ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaPintsFeb2025;
