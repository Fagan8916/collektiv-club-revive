
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-blue">Terms of Service</h1>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2>Terms of Service</h2>
              
              <p>Last updated: April 1, 2023</p>
              
              <h3>1. Introduction</h3>
              <p>Welcome to The Collektiv Club! These Terms of Service ("Terms") govern your access to and use of our website, services, applications, and tools (collectively, "Services"). By accessing or using our Services, you agree to be bound by these Terms.</p>
              
              <h3>2. Membership</h3>
              <p>By joining The Collektiv Club, you understand and acknowledge that:</p>
              <ul>
                <li>Membership is subject to approval.</li>
                <li>We reserve the right to revoke membership for violation of these Terms or for any reason at our sole discretion.</li>
                <li>Membership fees are non-refundable unless specified otherwise.</li>
              </ul>
              
              <h3>3. Investment Opportunities</h3>
              <p>Our Services may include providing information about investment opportunities. Please note:</p>
              <ul>
                <li>We do not provide investment advice or recommendations.</li>
                <li>All investments involve risk and may result in loss.</li>
                <li>You are solely responsible for any investment decisions made.</li>
                <li>Past performance is not indicative of future results.</li>
                <li>Investment opportunities are only available to qualifying members.</li>
              </ul>
              
              <h3>4. User Content</h3>
              <p>You retain ownership of content you submit on our platform, but grant us a worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with our Services.</p>
              
              <h3>5. Prohibited Conduct</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Violate any applicable laws or regulations.</li>
                <li>Infringe on the rights of others, including intellectual property rights.</li>
                <li>Use our Services to distribute unsolicited commercial content.</li>
                <li>Attempt to interfere with or disrupt our Services.</li>
                <li>Share confidential information provided through our platform.</li>
              </ul>
              
              <h3>6. Confidentiality</h3>
              <p>Certain information provided through our Services may be confidential. You agree to maintain the confidentiality of such information and not to disclose it to third parties without our explicit consent.</p>
              
              <h3>7. Intellectual Property</h3>
              <p>Our Services and their contents, features, and functionality are owned by The Collektiv Club and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
              
              <h3>8. Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, The Collektiv Club shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our Services.</p>
              
              <h3>9. Governing Law</h3>
              <p>These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
              
              <h3>10. Changes to Terms</h3>
              <p>We reserve the right to modify these Terms at any time. Your continued use of our Services after such modifications constitutes your acceptance of the revised Terms.</p>
              
              <h3>11. Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us at info@collektiv.club.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
