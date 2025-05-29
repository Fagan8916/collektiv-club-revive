
import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const AboutSection = () => {
  const features = [
    "Exclusive networking events",
    "Access to SaaS investment opportunities",
    "Access to industry experts",
    "Collaboration opportunities",
    "Community support system",
    "Digital and physical resources"
  ];

  const carouselSlides = [
    {
      title: "The Collektiv Revolution",
      content: "Creating a thriving ecosystem where members can connect, collaborate, and grow together."
    },
    {
      title: "Democratising Investment",
      content: "Making startup investment accessible to everyone, not just the wealthy elite. Lower fees mean more returns in your pocket."
    },
    {
      title: "Community-Driven Learning",
      content: "Access our exclusive Slack community, educational resources, and learn from experienced investors and successful founders."
    },
    {
      title: "Exclusive Deal Flow",
      content: "Get first access to curated investment opportunities from our network of vetted startups and innovative companies."
    },
    {
      title: "Expert Mentorship",
      content: "Learn from seasoned investors and successful entrepreneurs who share their knowledge and insights with our community."
    }
  ];

  return (
    <section className="section bg-white" id="about">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">About The Collektiv Club</h2>
          <p className="section-subtitle">
            We are a community-driven organization dedicated to bringing together ambitious 
            individuals who believe in the power of collective growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-6 text-collektiv-green">
              Why Join Our Community?
            </h3>
            <p className="text-gray-700 mb-8">
              At The Collektiv Club, we believe that individual success is amplified through 
              community support. Our members gain access to exclusive resources, events, 
              and a network of like-minded individuals all committed to growth and excellence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-collektiv-lightgreen mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <Link to="/about" className="btn-primary inline-flex">
              Learn More About Us
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-br from-collektiv-green to-collektiv-lightgreen h-full w-full relative">
                <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
                  <CarouselContent className="h-full">
                    {carouselSlides.map((slide, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="h-full flex items-center justify-center p-8">
                          <div className="text-center text-white">
                            <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                            <p className="text-green-100 mb-6">
                              {slide.content}
                            </p>
                            <div className="flex justify-center space-x-2">
                              <div className="bg-white/20 h-2 w-2 rounded-full"></div>
                              <div className="bg-white h-2 w-4 rounded-full"></div>
                              <div className="bg-white/20 h-2 w-2 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="text-collektiv-green bg-white hover:bg-white/90 left-4" />
                  <CarouselNext className="text-collektiv-green bg-white hover:bg-white/90 right-4" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
