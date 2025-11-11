import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TiranaExpo2024 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/members")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Members Zone
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-collektiv-green to-collektiv-green/80 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plug and Play Tirana Expo 2024
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Celebrating Albania's Emerging Startup Ecosystem
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>October 16-17, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Pyramid of Tirana, Albania</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>80+ International Attendees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Event Images */}
          <div className="grid md:grid-cols-3 gap-4">
            <img 
              src="/lovable-uploads/tirana-expo-featured.jpg" 
              alt="Kevin Chavanne speaking on panel at Tirana Expo" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/tirana-expo-speaker.jpg" 
              alt="Panel discussion at Tirana Expo" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/tirana-expo-attendees.jpg" 
              alt="Collektiv members at Tirana Expo" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/tirana-expo-panel.jpg" 
              alt="Expert panel discussions" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/tirana-expo-networking.jpg" 
              alt="Networking at the expo" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/tirana-expo-venue.jpg" 
              alt="The iconic Pyramid of Tirana venue" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/tirana-expo-pitches.jpg" 
              alt="Startup pitches" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
          </div>

          {/* About the Event */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                About the Event
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The Plug and Play Tirana Expo 2024 marked a historic milestone for Albania's startup ecosystem. 
                  Held at the iconic Pyramid of Tirana, this two-day event brought together over 80 international 
                  investors, corporates, and innovation leaders to celebrate the culmination of the Plug and Play 
                  Tirana Accelerator Program.
                </p>
                <p>
                  As the grand finale of the accelerator program, the expo showcased 20 promising startups from 
                  Albania and the wider Balkan region, offering them a platform to pitch to international investors 
                  and form meaningful partnerships. This event reinforced Albania's vision of becoming a new hub for 
                  startups, technology, and international investments, placing the country firmly on the global 
                  innovation map.
                </p>
                <p>
                  The event featured Collektiv Club members attending and networking with founders, investors, and 
                  industry leaders from across Europe and beyond, strengthening connections within the Balkan 
                  startup ecosystem.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Event Highlights */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                Event Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-collektiv-green/10 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-collektiv-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dates & Venue</h3>
                      <p className="text-sm text-gray-600">October 16-17, 2024</p>
                      <p className="text-sm text-gray-600">Pyramid of Tirana - Iconic architectural landmark</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-collektiv-green/10 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-collektiv-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Attendees</h3>
                      <p className="text-sm text-gray-600">80+ international investors and corporates</p>
                      <p className="text-sm text-gray-600">20 presenting startups</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-collektiv-green/10 p-2 rounded-lg">
                      <ExternalLink className="h-5 w-5 text-collektiv-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Key Partners</h3>
                      <p className="text-sm text-gray-600">Albanian-American Development Foundation</p>
                      <p className="text-sm text-gray-600">Municipality of Tirana</p>
                      <p className="text-sm text-gray-600">IDEMIA Smart Identity</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities & Impact */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                  Key Activities
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Startup pitch sessions and demo day presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>One-on-one investor meetings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Networking sessions and collaborative workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Panel discussions featuring industry experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-collektiv-green mt-1">•</span>
                    <span>Celebration of Albanian innovation and entrepreneurship</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                  Impact
                </h2>
                <p className="text-gray-700 mb-4">
                  This event demonstrated that Albania is not merely a local market, but an active player 
                  in the global network of technology and startups.
                </p>
                <p className="text-gray-700">
                  It created opportunities for Albanian founders to connect with Silicon Valley mentorship, 
                  international market exposure, and investment opportunities - positioning Albania as an 
                  emerging innovation hub in the Balkans.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* External Links */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                Learn More
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.open("https://tiranaexpo.com/", "_blank")}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Official Event Website
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://www.plugandplaytechcenter.com/", "_blank")}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Plug and Play Tech Center
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default TiranaExpo2024;
