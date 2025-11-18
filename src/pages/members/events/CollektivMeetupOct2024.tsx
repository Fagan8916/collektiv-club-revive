import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CollektivMeetupOct2024 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-collektiv-green to-collektiv-green/80 text-white py-16">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collektiv Member and Founder Meet Up
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Building Connections Over Beers
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>9th October 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>The Woodins Shades, Bishopsgate, London</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>20+ Members and Founders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Event Images Gallery */}
          <div className="grid md:grid-cols-3 gap-4">
            <img 
              src="/lovable-uploads/collektiv-meetup-group1.jpg" 
              alt="Collektiv members networking" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-group2.jpg" 
              alt="Members enjoying the evening" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-group3.jpg" 
              alt="Members and founders connecting" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-networking1.jpg" 
              alt="Networking at the venue" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-members1.jpg" 
              alt="Members enjoying drinks" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-networking2.jpg" 
              alt="Engaging conversations" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-bar.jpg" 
              alt="At the bar" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-members2.jpg" 
              alt="Group photo" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-conversation.jpg" 
              alt="Deep in conversation" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-venue.jpg" 
              alt="The venue atmosphere" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-members3.jpg" 
              alt="Members mingling" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-networking3.jpg" 
              alt="More networking moments" 
              className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
            <img 
              src="/lovable-uploads/collektiv-meetup-table.jpg" 
              alt="Casual discussions at the table" 
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
                  On October 9th, 2024, Collektiv Club members and founders gathered at The Woodins Shades 
                  in Bishopsgate for an evening of genuine connection and conversation. This casual meet-up 
                  embodied the heart of what Collektiv is all about - bringing together passionate investors 
                  and innovative founders in a relaxed, authentic setting.
                </p>
                <p>
                  Over beers and good company, members exchanged insights on everything from early-stage 
                  investing strategies to the latest trends in SaaS and tech startups. The informal atmosphere 
                  fostered natural conversations and meaningful connections that extended well beyond typical 
                  networking events.
                </p>
                <p>
                  The evening highlighted the collaborative spirit of the Collektiv community, where experienced 
                  investors share knowledge with newer members, and founders gain valuable feedback and support 
                  from those who understand the startup journey firsthand.
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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-collektiv-green/10 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-collektiv-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Date & Venue</h3>
                      <p className="text-sm text-gray-600">9th October 2024, 6:00 PM onwards</p>
                      <p className="text-sm text-gray-600">The Woodins Shades, 212 Bishopsgate</p>
                      <p className="text-sm text-gray-600">London EC2M 4PT</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-collektiv-green/10 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-collektiv-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Attendees</h3>
                      <p className="text-sm text-gray-600">20+ Club members</p>
                      <p className="text-sm text-gray-600">Portfolio founders</p>
                      <p className="text-sm text-gray-600">Guest investors</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-2">What Made It Special</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-collektiv-green mt-1">•</span>
                      <span>Relaxed atmosphere for genuine connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-collektiv-green mt-1">•</span>
                      <span>Knowledge sharing between experienced and new investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-collektiv-green mt-1">•</span>
                      <span>Founder insights and startup stories</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-collektiv-green mt-1">•</span>
                      <span>Beers on us - our way of saying thanks to the community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-collektiv-green mt-1">•</span>
                      <span>Organic networking and relationship building</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Impact */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-collektiv-green mb-4">
                Building Our Community
              </h2>
              <p className="text-gray-700 mb-4">
                Events like this are at the core of the Collektiv experience. We believe that the best 
                investment insights and opportunities come from building genuine relationships within our 
                community. Whether you&apos;re a seasoned angel investor or just starting your journey, 
                these gatherings provide invaluable opportunities to learn, share, and connect.
              </p>
              <p className="text-gray-700">
                The conversations sparked at this meet-up have already led to new collaborations, 
                mentorship relationships, and investment discussions - proving that sometimes the best 
                deals are made over a pint in good company.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default CollektivMeetupOct2024;
