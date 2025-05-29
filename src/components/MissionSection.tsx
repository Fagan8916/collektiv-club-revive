
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const MissionSection = () => {
  const slides = [
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
    }
  ];

  return (
    <section className="section bg-collektiv-green text-white" id="mission">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="text-center py-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                      {slide.content}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-collektiv-green bg-white hover:bg-white/90" />
            <CarouselNext className="text-collektiv-green bg-white hover:bg-white/90" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
