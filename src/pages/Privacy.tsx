
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
              <h2>Privacy Policy</h2>
              
              <p>Last updated: April 1, 2023</p>
              
              <h3>1. Introduction</h3>
              <p>Welcome to The Collektiv Club's Privacy Policy. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
              
              <h3>2. Data We Collect</h3>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul>
                <li>Identity Data: includes first name, last name, username or similar identifier.</li>
                <li>Contact Data: includes billing address, delivery address, email address and telephone numbers.</li>
                <li>Financial Data: includes bank account and payment card details for membership payments.</li>
                <li>Transaction Data: includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li>Technical Data: includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li>Profile Data: includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
                <li>Usage Data: includes information about how you use our website, products and services.</li>
                <li>Marketing and Communications Data: includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>
              
              <h3>3. How We Use Your Data</h3>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul>
                <li>To register you as a new member.</li>
                <li>To process and deliver your membership benefits.</li>
                <li>To manage our relationship with you.</li>
                <li>To administer and protect our business and this website.</li>
                <li>To deliver relevant website content and advertisements to you.</li>
                <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences.</li>
              </ul>
              
              <h3>4. Data Security</h3>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
              
              <h3>5. Data Retention</h3>
              <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
              
              <h3>6. Your Legal Rights</h3>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
              
              <h3>7. Third-Party Links</h3>
              <p>This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.</p>
              
              <h3>8. Changes to This Privacy Policy</h3>
              <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.</p>
              
              <h3>9. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at info@collektiv.club.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
