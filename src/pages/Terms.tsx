
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">Terms of Service</h1>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h1>TERMS OF SERVICE</h1>
              <p><strong>Last updated February 10, 2025</strong></p>

              <hr />

              <h2>1. AGREEMENT TO OUR LEGAL TERMS</h2>
              <p>We are <strong>Collektiv Ltd</strong> ("Company," "we," "us," "our"), a company registered in United Kingdom at 4th Floor, 4 Tabernacle Street, London, United Kingdom, EC2A 4LU.</p>

              <p>We operate the website <a href="http://www.collektiv.club" target="_blank">http://www.collektiv.club</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").</p>

              <p>Angel syndicate network allowing investments into founder-led businesses</p>

              <p>These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Collektiv Ltd, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>

              <h2>2. OUR SERVICES</h2>
              <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.</p>

              <h2>3. INTELLECTUAL PROPERTY RIGHTS</h2>
              <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>

              <h2>4. USER REPRESENTATIONS</h2>
              <p>By using the Services, you represent and warrant that:</p>
              <ul>
                <li>All registration information you submit will be true, accurate, current, and complete</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                <li>You have the legal capacity and you agree to comply with these Legal Terms</li>
                <li>You are not under the age of 13</li>
                <li>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services</li>
                <li>You will not access the Services through automated or non-human means, whether through a bot, script or otherwise</li>
                <li>You will not use the Services for any illegal or unauthorized purpose</li>
                <li>Your use of the Services will not violate any applicable law or regulation</li>
              </ul>

              <h2>5. PROHIBITED ACTIVITIES</h2>
              <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

              <h2>6. USER GENERATED CONTRIBUTIONS</h2>
              <p>The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").</p>

              <h2>7. PRIVACY POLICY</h2>
              <p>We care about data privacy and security. Please review our Privacy Policy: <a href="/privacy">http://www.collektiv.club/privacy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.</p>

              <h2>8. TERM AND TERMINATION</h2>
              <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.</p>

              <h2>9. DISCLAIMERS</h2>
              <p>THE INFORMATION ON THIS WEBSITE IS PROVIDED ON AN "AS IS" BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, THIS COMPANY:</p>
              <ul>
                <li>EXCLUDES ALL REPRESENTATIONS AND WARRANTIES RELATING TO THIS WEBSITE AND ITS CONTENTS</li>
                <li>EXCLUDES ALL LIABILITY FOR DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THIS WEBSITE</li>
              </ul>

              <h2>10. LIMITATIONS OF LIABILITY</h2>
              <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.</p>

              <h2>11. GOVERNING LAW</h2>
              <p>These Legal Terms shall be governed by and defined following the laws of United Kingdom. Collektiv Ltd and yourself irrevocably consent that the courts of United Kingdom shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.</p>

              <h2>12. CONTACT US</h2>
              <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>

              <p><strong>Collektiv Ltd</strong><br />
              4th Floor, 4 Tabernacle Street<br />
              London, United Kingdom, EC2A 4LU<br />
              Email: info@collektiv.club</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
