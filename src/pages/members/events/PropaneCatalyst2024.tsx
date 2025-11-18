import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PropaneCatalyst2024 = () => {
  const navigate = useNavigate();

  const eventImages = [
    "/lovable-uploads/propane-catalyst-featured.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src="/lovable-uploads/propane-catalyst-featured.jpg" 
          alt="Catalyst Dinner at Dishoom"
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
              Catalyst: Dinner @ London
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              A roaming event series for founders, operators, and builders shaping AI companies — powered by Propane
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
                  <p className="text-muted-foreground">Tuesday, October 14, 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Time</p>
                  <p className="text-muted-foreground">6:30 PM - 9:30 PM GMT+1</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Location</p>
                  <p className="text-muted-foreground">Dishoom King's Cross, London</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-collektiv-green mt-1" />
                <div>
                  <p className="font-semibold text-lg">Attendees</p>
                  <p className="text-muted-foreground">15 members and founders</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">About the Event</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Catalyst is a roaming event series for founders, operators, and builders shaping what it means to build AI companies today. Each edition gathers top minds across product, technology, go-to-market, and investment to explore the new playbooks for creating and scaling AI companies — powered by Propane.
                  </p>
                  <p>
                    This London edition brought together 15 innovative minds at the iconic Dishoom King's Cross for an evening of authentic conversation, delicious food, and valuable connections. Attendees explored cutting-edge AI strategies while enjoying the vibrant atmosphere of one of London's favorite dining destinations.
                  </p>
                  <p>
                    The intimate setting fostered deep discussions about the future of AI in business, product development, and go-to-market strategies, making it a memorable evening for all participants.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">Event Highlights</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Expert discussions on building and scaling AI companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Networking with founders, operators, and builders in the AI space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Intimate dinner setting for meaningful connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Insights into product, technology, and go-to-market strategies for AI</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <div>
          <h2 className="text-3xl font-bold text-collektiv-green mb-6">Event Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {eventImages.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
                <img 
                  src={image} 
                  alt={`Catalyst dinner moment ${index + 1}`}
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

export default PropaneCatalyst2024;
