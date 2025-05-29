
import React from "react";
import ArticleLayout from "@/components/ArticleLayout";

const WhatToLookForInFounders = () => {
  const content = (
    <div className="prose prose-lg max-w-none">
      <p className="text-lg text-gray-700 mb-6">
        At COLLEKTIV, we meet with dozens of founders every month, and if there's one thing we know, it's that the quality of a founding team is the single biggest predictor of a startup's success. While a great idea is important, it's the founders who turn vision into reality, weather storms, and inspire teams to go the distance. So, what should investors look for when evaluating founders? Here's a breakdown of the traits and qualities that set exceptional founders apart.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Visionary Thinking</h2>
      <p className="mb-6">
        Great founders have a clear, compelling vision for the future. They don't just see where the market is, they anticipate where it's going and inspire others to join them on the journey. Visionary founders articulate their mission with conviction, rallying talent, investors, and customers around a shared purpose. This vision is both ambitious and grounded, providing a roadmap for growth.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Resilience and Persistence</h2>
      <p className="mb-6">
        Startups are a rollercoaster. The ability to bounce back from setbacks, learn from failure, and keep pushing forward is non-negotiable. Resilient founders demonstrate grit, adaptability, and an unwavering commitment to their goals even when the going gets tough. As Ben Horowitz puts it, the best founders simply "didn't quit".
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Adaptability</h2>
      <p className="mb-6">
        Markets shift, competitors emerge, and assumptions are challenged. The best founders are flexible, willing to pivot when necessary, and open to feedback. Adaptability means staying true to the core mission while being responsive to new information and changing circumstances. It's a balance between conviction and coachability.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Execution Ability</h2>
      <p className="mb-6">
        Ideas are cheap, execution is everything. Investors want to see founders who can turn plans into action: launching products, hitting milestones, and building momentum. This requires smart work, prioritisation, and relentless focus on results. A track record of getting things done is a strong signal.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Leadership and Team Building</h2>
      <p className="mb-6">
        A founder's ability to attract, inspire, and retain top talent is crucial. Strong leaders empower their teams, foster collaboration, and lead by example. They're decisive, delegate effectively, and create a culture where people want to do their best work. Teamwork and communication skills are essential, no founder succeeds alone.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Market Knowledge and Industry Experience</h2>
      <p className="mb-6">
        Deep understanding of the target market, customers, and competitive landscape is a must. Founders who know their industry inside-out are better positioned to spot opportunities, avoid pitfalls, and outmaneuver competitors.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Integrity and Ethics</h2>
      <p className="mb-6">
        Trust is the foundation of any successful venture. Investors look for founders who are honest, transparent, and ethical in all their dealings. Integrity builds confidence with investors, employees, and customers and is non-negotiable for long-term success.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Passion and Drive</h2>
      <p className="mb-6">
        Building a company is a marathon, not a sprint. Passion is the fuel that keeps founders motivated through the inevitable ups and downs. Investors are drawn to founders who are genuinely committed to their mission, not just chasing financial gain, but deeply believing in what they're building.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Creativity and Innovation</h2>
      <p className="mb-6">
        Exceptional founders are creative problem-solvers who challenge the status quo. They see opportunities where others see obstacles and aren't afraid to think differently. Innovation isn't just about product, it's about reimagining business models, processes, and customer experiences.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">Self-Awareness</h2>
      <p className="mb-6">
        The best founders know their strengths and weaknesses. They're humble enough to seek help, hire complementary talent, and learn from mistakes. Self-awareness enables continuous growth and better decision-making.
      </p>

      <h2 className="text-2xl font-bold text-collektiv-green mb-4">The COLLEKTIV Approach</h2>
      <p className="mb-6">
        At COLLEKTIV, our screening process puts founders at the centre. We meet them face-to-face, ask tough questions, and look for these core traits. Our members conduct their own due diligence, focusing not just on the pitch, but on the people behind it. Because in early-stage investing, you're not just backing a product, you're backing the people who will bring it to life.
      </p>

      <p className="text-lg font-medium text-gray-800 mb-6">
        In summary: When evaluating founders, look for vision, resilience, adaptability, execution, leadership, market knowledge, integrity, passion, creativity, and self-awareness. These are the qualities that separate the exceptional from the average and ultimately, the successful from the rest.
      </p>

      <p className="text-lg text-collektiv-green font-medium">
        Ready to meet the founders shaping the future? Join COLLEKTIV and get access to the next wave of high-potential startups.
      </p>
    </div>
  );

  return (
    <ArticleLayout
      title="What to Look for in Founders: A Guide for Investors"
      date="May 29, 2025"
      author="Investment Team"
      category="Founder Evaluation"
      content={content}
      image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    />
  );
};

export default WhatToLookForInFounders;
