
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
              <h2 className="font-bold">Terms and Conditions of Service</h2>
              
              <p>Last Updated: February 1st, 2023</p>

              <p>The following Terms and Conditions of Service ("Terms") constitute a legal agreement between you and Collektiv Club ltd established under the laws of England and Wales ("Collektiv", "we", "us", "our"). These Terms govern your use of our website available at <a href="http://www.collektiv.club" className="text-collektiv-green">www.collektiv.club</a> ("Website") and our proprietary platform available through it, including related applications, mobile applications, documentation, forums, functionalities, information and other services (collectively the "Platform").</p>

              <p>Detailed information about Collektiv:</p>
              <ul>
                <li>Company name: Collektiv Club ltd</li>
                <li>Principal place of business: 20-22 Wenlock Road | London N1 7GU</li>
                <li>Company Registration Number: 14624076</li>
                <li>Email: <a href="mailto:info@collektiv.club" className="text-collektiv-green">info@collektiv.club</a></li>
              </ul>

              <p>BY ACCESSING OR USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE WITH THESE TERMS YOU ARE PROHIBITED FROM USING THE PLATFORM.</p>

              <h3 className="font-bold">1. YOUR ELIGIBILITY</h3>
              <p>By using our Platform and/or by agreeing to these Terms you warrant and represent that you:</p>
              <ol className="list-decimal pl-6">
                <li>Are at least 18 years of age. We do not permit those under 18 to use our Platform;</li>
                <li>Have full legal capacity to enter into a legally binding agreement with us;</li>
                <li>Are not legally barred from using our Platform under the laws of your country or the laws of any other relevant jurisdiction;</li>
              </ol>

              <h3 className="font-bold">2. OUR SERVICES</h3>
              <p>The Platform enables you to efficiently track and manage early-stage investments.</p>
              <p>You are not obligated to use our services and are free to use other services. These Terms, however, apply when you use our Platform.</p>
              <p>To provide the Platform, we may engage various third-party vendors, suppliers, and subcontractors as appropriate from time to time. The selection of these third parties is at our discretion.</p>
              <p>You understand and acknowledge that our Platform is a technical means of organizing investment opportunities and is not an investment advisor and our Platform materials do not constitute investment advice.</p>

              <h3 className="font-bold">3. YOUR ACCOUNT</h3>
              <p>To access our Platform, you need to register an account.</p>
              <p>By registering an account, you agree to:</p>
              <ol className="list-decimal pl-6">
                <li>Provide accurate, current, and complete information during the registration process;</li>
                <li>Update your information to keep it accurate, current, and complete;</li>
                <li>Keep your password confidential;</li>
                <li>Notify us immediately if you detect any security breach or unauthorized use of your account;</li>
                <li>Accept responsibility for all activities that occur under your account;</li>
                <li>Not impersonate any person or entity, not falsely state or misrepresent your affiliation with a person or entity, and not create any false identity on the Platform.</li>
              </ol>
              <p>We reserve the right to suspend or delete your account if any information provided proves to be inaccurate, false, or outdated.</p>

              <h3 className="font-bold">4. PAYMENT TERMS</h3>
              <p>The fees and other charges for using our Platform ("Fees") are described on our Website. Fees exclude VAT and other applicable taxes.</p>
              <p>We may update our Fees at any time. We will notify you of any material changes at least 15 days before they become effective. Your continued use of the Platform after such notice constitutes your acceptance of the updated Fees.</p>
              <p>Fees may be paid using our selected payment methods. By providing your payment details, you represent and warrant that you are legally authorized to use the selected payment method.</p>
              <p>All Fees due are non-refundable unless otherwise stated in these Terms or required by law.</p>

              <h3 className="font-bold">5. COMMUNICATIONS AND NOTICES</h3>
              <p>You agree that we may send you notices and messages through the Platform, email, text message, or by posting notices on the Website. You consent to receive communications from us electronically and agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communications be in writing.</p>
              <p>Our electronic communications to you are considered delivered when we send them. Your electronic communications to us are considered delivered when we receive them.</p>

              <h3 className="font-bold">6. YOUR RESPONSIBILITIES</h3>
              <p>When using our Platform, you agree to:</p>
              <ol className="list-decimal pl-6">
                <li>Take all reasonable precautions to prevent unauthorized access to our Platform;</li>
                <li>Only use the Platform in accordance with these Terms and applicable laws;</li>
                <li>Not misuse the Platform or use it for harmful, illegal, or unethical purposes.</li>
              </ol>

              <h3 className="font-bold">7. COMPLIANCE WITH REGULATORY LAWS</h3>
              <p>You must comply with all applicable laws, regulations, and rules concerning your use of the Platform. We may require additional documentation or verification of your identity, source of funds, or other information in order to comply with applicable laws. You agree to promptly provide such information upon our request.</p>

              <h3 className="font-bold">8. WARRANTIES AND LIMITATION OF LIABILITY</h3>
              <p>The Platform is provided on an "as is" and "as available" basis. We do not warrant that the Platform will be uninterrupted, secure, or error-free. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
              <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Platform; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; or (c) any interruption or cessation of transmission to or from the Platform.</p>
              <p>Our total liability for any claims related to these Terms shall not exceed the amount you have paid us in the 3 months preceding the claim.</p>

              <h3 className="font-bold">9. INTELLECTUAL PROPERTY RIGHTS</h3>
              <p>We own all intellectual property rights in the Platform. These Terms do not grant you any right, title, or interest in or to any intellectual property rights in the Platform. You may not reproduce, modify, or create derivative works based on the Platform or any part thereof without our prior written consent.</p>

              <h3 className="font-bold">10. TERMINATION</h3>
              <p>We may suspend or terminate your access to the Platform at any time, with or without cause, and with or without notice.</p>
              <p>You may terminate your account at any time by following the instructions on the Platform or by contacting us.</p>
              <p>Upon termination:</p>
              <ol className="list-decimal pl-6">
                <li>Your right to use the Platform will immediately cease;</li>
                <li>We may delete your account and all associated data;</li>
                <li>Provisions of these Terms that, by their nature, should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</li>
              </ol>

              <h3 className="font-bold">11. CONFIDENTIALITY</h3>
              <p>You agree to keep confidential any non-public information about the Platform and other users that you obtain through the Platform.</p>

              <h3 className="font-bold">12. PRIVACY</h3>
              <p>Our Privacy Policy describes how we collect, use, and disclose information about you. By using the Platform, you agree to our collection, use, and disclosure of information as described in our Privacy Policy.</p>

              <h3 className="font-bold">13. GOVERNING LAW AND DISPUTE RESOLUTION</h3>
              <p>These Terms shall be governed by and construed in accordance with the laws of England and Wales.</p>
              <p>Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

              <h3 className="font-bold">14. CHANGES TO THESE TERMS</h3>
              <p>We may modify these Terms at any time at our sole discretion. If we make material changes to these Terms, we will provide you with notice as appropriate under the circumstances, such as by displaying a prominent notice within the Platform or by sending you an email. Your continued use of the Platform after such notice constitutes your acceptance of the modified Terms.</p>

              <h3 className="font-bold">15. MISCELLANEOUS</h3>
              <p>These Terms constitute the entire agreement between you and us regarding the Platform and supersede all prior agreements and understandings, whether written or oral, regarding the Platform.</p>
              <p>Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.</p>
              <p>If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>
              <p>You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and void. We may assign or transfer these Terms, at our sole discretion, without restriction.</p>
              <p>The section titles in these Terms are for convenience only and have no legal or contractual effect.</p>

              <h3 className="font-bold">Contact Us</h3>
              <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@collektiv.club" className="text-collektiv-green">info@collektiv.club</a>.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
