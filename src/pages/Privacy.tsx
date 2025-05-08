
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">Privacy Policy</h1>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h1>Privacy Policy</h1>
              <p><strong>Last updated: February 10, 2025</strong></p>

              <p>This Privacy Notice for Collektiv Ltd ("we", "us", or "our") describes how and why we might collect, store, use, and/or share ("process") your personal information when you use our services, including when you:</p>
              <ul>
                <li>Visit our website at <a href="http://www.collektiv.club" target="_blank">www.collektiv.club</a> or any website of ours that links to this Privacy Notice</li>
                <li>Use Angel (an angel syndicate network allowing investments into founder-led businesses)</li>
                <li>Engage with us in other related ways, including sales, marketing, or events</li>
              </ul>

              <p><strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you have any questions, contact us at <a href="mailto:info@collektiv.club">info@collektiv.club</a>.</p>

              <h2>Summary of Key Points</h2>
              <ul>
                <li><strong>What personal information do we process?</strong> We may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</li>
                <li><strong>Do we process any sensitive personal information?</strong> Some information may be considered 'special' or 'sensitive' in certain jurisdictions. We may process sensitive personal information with your consent or as permitted by law.</li>
                <li><strong>Do we collect any information from third parties?</strong> We do not collect information from third parties.</li>
                <li><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with the law.</li>
                <li><strong>When and with whom do we share personal information?</strong> We may share information in specific situations and with specific third parties.</li>
                <li><strong>What are your rights?</strong> Depending on your location, you may have certain rights regarding your personal information.</li>
                <li><strong>How do you exercise your rights?</strong> The easiest way is by submitting a <a href="https://app.termly.io/notify/b2ff46fd-db4e-46af-8c7f-b46de404d940" target="_blank">data subject access request</a> or by contacting us.</li>
              </ul>

              <h2>Contact Us</h2>
              <p>Email: <a href="mailto:info@collektiv.club">info@collektiv.club</a></p>
              <p>Address: Collektiv Ltd, 25 Firs Park Avenue, London N21 2PR, United Kingdom</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
