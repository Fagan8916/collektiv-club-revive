
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
      content: "Making startup investment accessible to everyone, not just the wealthy elite. Lower fees mean more returns."
    },
    {
      title: "Community-Driven Learning",
      content: "Access our exclusive Slack community, educational resources, and learn from experienced investors."
    },
    {
      title: "Exclusive Deal Flow",
      content: "Get first access to curated investment opportunities from our network of vetted startups."
    },
    {
      title: "Expert Mentorship",
      content: "Learn from seasoned investors and successful entrepreneurs who share their insights."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-collektiv-dark to-collektiv-darkTeal" id="about">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-collektiv-green text-sm font-medium uppercase tracking-widest mb-3">About Us</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">The Collektiv Club</h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            A community-driven organization bringing together ambitious individuals who believe in the power of collective growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="font-display text-2xl font-bold mb-6 text-white">
              Why Join Our Community?
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              At The Collektiv Club, we believe that individual success is amplified through 
              community support. Our members gain access to exclusive resources, events, 
              and a network of like-minded individuals all committed to growth and excellence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-collektiv-green mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <Link 
              to="/about" 
              className="inline-flex bg-collektiv-green text-white px-6 py-3 rounded-full font-semibold hover:bg-collektiv-lightgreen transition-all duration-300"
            >
              Learn More About Us
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-white/5 border border-white/10 h-full w-full relative">
                <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
                  <CarouselContent className="h-full">
                    {carouselSlides.map((slide, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="h-full flex items-center justify-center p-10">
                          <div className="text-center text-white">
                            <h3 className="font-display text-3xl font-bold mb-4">{slide.title}</h3>
                            <p className="text-white/70 text-base leading-relaxed">{slide.content}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="text-white bg-white/10 hover:bg-white/20 border-white/20 left-4" />
                  <CarouselNext className="text-white bg-white/10 hover:bg-white/20 border-white/20 right-4" />
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
