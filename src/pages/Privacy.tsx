
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-collektiv-green">Privacy Policy</h1>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h1>PRIVACY POLICY</h1>
              <p><strong>Last updated February 10, 2025</strong></p>

              <hr />

              <p>This Privacy Notice for <strong>Collektiv Ltd</strong> ("we", "us", or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:</p>
              <ul>
                <li>Visit our website at <a href="http://www.collektiv.club" target="_blank">http://www.collektiv.club</a>, or any website of ours that links to this Privacy Notice</li>
                <li>Use Angel, an angel syndicate network allowing investments into founder-led businesses</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
              </ul>

              <p><strong>Questions or concerns?</strong><br />
              Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at Info@Collektiv.club.</p>

              <hr />

              <h2>SUMMARY OF KEY POINTS</h2>
              <p><em>This summary provides key points from our Privacy Notice. You can find out more details about any of these topics by clicking the link following each key point or by using our <a href="#table-of-contents">table of contents</a> below.</em></p>
              <ul>
                <li><strong>What personal information do we process?</strong><br />
                When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a href="#personal-information-you-disclose-to-us">personal information you disclose to us</a>.</li>
                <li><strong>Do we process any sensitive personal information?</strong><br />
                Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. Learn more about <a href="#sensitive-information">sensitive information we process</a>.</li>
                <li><strong>Do we collect any information from third parties?</strong><br />
                We collect information from Google when you choose to sign in with Google OAuth. Learn more about <a href="#third-party-login-services">third-party login services</a>.</li>
                <li><strong>How do we process your information?</strong><br />
                We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="#how-do-we-process-your-information">how we process your information</a>.</li>
                <li><strong>In what situations and with which types of parties do we share personal information?</strong><br />
                We may share information in specific situations and with specific categories of third parties. Learn more about <a href="#when-and-with-whom-do-we-share-your-personal-information">when and with whom we share your personal information</a>.</li>
                <li><strong>What are your rights?</strong><br />
                Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#what-are-your-privacy-rights">your privacy rights</a>.</li>
                <li><strong>How do you exercise your rights?</strong><br />
                The easiest way to exercise your rights is by <a href="https://app.termly.io/notify/b2ff46fd-db4e-46af-8c7f-b46de404d940" target="_blank">submitting a data subject access request</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</li>
              </ul>

              <p>Want to learn more about what we do with any information we collect? <a href="#table-of-contents">Review the Privacy Notice in full</a>.</p>

              <hr />

              <h2 id="table-of-contents">TABLE OF CONTENTS</h2>
              <ol>
                <li><a href="#what-information-do-we-collect">WHAT INFORMATION DO WE COLLECT?</a></li>
                <li><a href="#how-do-we-process-your-information">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                <li><a href="#what-legal-bases-do-we-rely-on-to-process-your-personal-information">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                <li><a href="#when-and-with-whom-do-we-share-your-personal-information">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                <li><a href="#third-party-login-services">THIRD-PARTY LOGIN SERVICES</a></li>
                <li><a href="#do-we-use-cookies-and-other-tracking-technologies">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
                <li><a href="#how-long-do-we-keep-your-information">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                <li><a href="#do-we-collect-information-from-minors">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                <li><a href="#what-are-your-privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                <li><a href="#controls-for-do-not-track-features">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                <li><a href="#do-we-make-updates-to-this-notice">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                <li><a href="#how-can-you-contact-us-about-this-notice">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                <li><a href="#how-can-you-review-update-or-delete-the-data-we-collect-from-you">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
              </ol>

              <hr />

              <h2 id="what-information-do-we-collect">1. WHAT INFORMATION DO WE COLLECT?</h2>
              <h3 id="personal-information-you-disclose-to-us">Personal information you disclose to us</h3>
              <p><strong>In Short:</strong><br />
              We collect personal information that you provide to us.</p>

              <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>

              <p><strong>Personal Information Provided by You:</strong><br />
              The personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include:</p>
              <ul>
                <li>Names</li>
                <li>Email addresses</li>
                <li>Phone numbers</li>
                <li>Mailing addresses</li>
                <li>Job titles</li>
                <li>Contact preferences</li>
                <li>Contact or authentication data</li>
                <li>Billing addresses</li>
              </ul>

              <p id="sensitive-information"><strong>Sensitive Information:</strong><br />
              When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:</p>
              <ul>
                <li>Financial data</li>
              </ul>

              <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

              <h3>Information automatically collected</h3>
              <p><strong>In Short:</strong><br />
              Some information - such as your Internet Protocol (IP) address and/or browser and device characteristics - is collected automatically when you visit our Services.</p>

              <p>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</p>

              <p>The information we collect includes:</p>
              <ul>
                <li><strong>Log and Usage Data:</strong> Service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files.</li>
              </ul>

              <h3>Google API</h3>
              <p>Our use of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">Google API Services User Data Policy</a>, including the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" target="_blank">Limited Use requirements</a>.</p>

              <hr />

              <h2 id="how-do-we-process-your-information">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
              <p><strong>In Short:</strong><br />
              We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>

              <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
              <ul>
                <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
                <li>To deliver and facilitate delivery of services to the user.</li>
                <li>To respond to user inquiries/offer support to users.</li>
                <li>To send administrative information to you.</li>
                <li>To fulfil and manage your orders, payments, returns, and exchanges made through the Services.</li>
                <li>To enable user-to-user communications.</li>
                <li>To save or protect an individual's vital interest, such as to prevent harm.</li>
              </ul>

              <hr />

              <h2 id="what-legal-bases-do-we-rely-on-to-process-your-personal-information">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</h2>
              <p><strong>In Short:</strong><br />
              We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e. legal basis) to do so under applicable law.</p>

              <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases:</p>
              <ul>
                <li><strong>Consent:</strong> We may process your information if you have given us permission (i.e. consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
                <li><strong>Performance of a Contract:</strong> We may process your personal information when we believe it is necessary to fulfil our contractual obligations to you.</li>
                <li><strong>Legal Obligations:</strong> We may process your information where we believe it is necessary for compliance with our legal obligations.</li>
                <li><strong>Vital Interests:</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party.</li>
              </ul>

              <hr />

              <h2 id="when-and-with-whom-do-we-share-your-personal-information">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
              <p><strong>In Short:</strong><br />
              We may share information in specific situations described in this section and/or with the following categories of third parties.</p>

              <p><strong>Vendors, Consultants, and Other Third-Party Service Providers:</strong><br />
              We may share your data with third-party vendors, service providers, contractors, or agents ("third parties") who perform services for us or on our behalf and require access to such information to do that work.</p>

              <p>Categories of third parties we may share personal information with include:</p>
              <ul>
                <li>Communication & Collaboration Tools</li>
                <li>Data Analytics Services</li>
                <li>Payment Processors</li>
                <li>Order Fulfilment Service Providers</li>
                <li>Performance Monitoring Tools</li>
              </ul>

              <p>Other sharing situations may include:</p>
              <ul>
                <li><strong>Business Transfers</strong></li>
                <li><strong>Affiliates</strong></li>
                <li><strong>Business Partners</strong></li>
              </ul>

              <hr />

              <h2 id="third-party-login-services">5. THIRD-PARTY LOGIN SERVICES</h2>
              <p><strong>In Short:</strong><br />
              We offer Google OAuth as a login option and process information we receive from Google in accordance with their policies and our privacy practices.</p>

              <h3>Google OAuth Integration</h3>
              <p>When you choose to sign in with Google, we collect and process the following information from your Google account:</p>
              <ul>
                <li><strong>Basic Profile Information:</strong> Your name, email address, and profile picture</li>
                <li><strong>Email Address:</strong> Used for account identification and communication</li>
                <li><strong>Google User ID:</strong> Used to link your Google account to our services</li>
              </ul>

              <h3>How We Use Google OAuth Data</h3>
              <p>Information obtained through Google OAuth is used exclusively for:</p>
              <ul>
                <li>Creating and maintaining your user account</li>
                <li>Providing authentication services</li>
                <li>Sending service-related communications</li>
                <li>Ensuring account security and preventing fraud</li>
              </ul>

              <h3>Google Data Retention and Deletion</h3>
              <p>We store Google OAuth data only as long as necessary to provide our services. You can:</p>
              <ul>
                <li>Request deletion of your account and associated Google data by contacting us at info@collektiv.club</li>
                <li>Revoke our access to your Google account at any time through your <a href="https://myaccount.google.com/permissions" target="_blank">Google Account permissions page</a></li>
              </ul>

              <h3>Google API Services User Data Policy Compliance</h3>
              <p>Our use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">Google API Services User Data Policy</a>, including the Limited Use requirements. We do not use Google user data for any purpose other than providing and improving our services.</p>

              <hr />

              <h2 id="do-we-use-cookies-and-other-tracking-technologies">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
              <p><strong>In Short:</strong><br />
              We may use cookies and other tracking technologies to collect and store your information.</p>

              <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>

              <p>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising.</p>

              <p><strong>Google Analytics</strong><br />
              We may share your information with Google Analytics to track and analyse the use of the Services.<br />
              To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">https://tools.google.com/dlpage/gaoptout</a>.<br />
              You can opt out of Google Analytics Advertising Features through <a href="https://adssettings.google.com/" target="_blank">Ads Settings</a> and Ad Settings for mobile apps.<br />
              Other opt out means include <a href="http://optout.networkadvertising.org/" target="_blank">http://optout.networkadvertising.org/</a> and <a href="http://www.networkadvertising.org/mobile-choice" target="_blank">http://www.networkadvertising.org/mobile-choice</a>.<br />
              For more information on the privacy practices of Google, please visit the <a href="https://policies.google.com/privacy" target="_blank">Google Privacy & Terms page</a>.</p>

              <hr />

              <h2 id="how-long-do-we-keep-your-information">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
              <p><strong>In Short:</strong><br />
              We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</p>

              <p>No purpose in this notice will require us keeping your personal information for longer than three (3) months past the termination of the user's account.</p>

              <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

              <hr />

              <h2 id="do-we-collect-information-from-minors">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
              <p><strong>In Short:</strong><br />
              We do not knowingly collect data from or market to children under 18 years of age.</p>

              <p>If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at info@collektiv.club.</p>

              <hr />

              <h2 id="what-are-your-privacy-rights">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
              <p><strong>In Short:</strong><br />
              In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Switzerland, you have rights that allow you greater access to and control over your personal information.</p>

              <p>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>

              <p>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank">Member State data protection authority</a> or <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" target="_blank">UK data protection authority</a>.<br />
              If you are located in Switzerland, you may contact the <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank">Federal Data Protection and Information Commissioner</a>.</p>

              <h3>Withdrawing your consent</h3>
              <p>If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us using the contact details provided in the section <a href="#how-can-you-contact-us-about-this-notice">How can you contact us about this notice?</a>.</p>

              <h3>Opting out of marketing and promotional communications</h3>
              <p>You can unsubscribe from our marketing and promotional communications at any time by replying 'STOP' or 'UNSUBSCRIBE' to the SMS messages that we send, or by contacting us using the details provided in the section <a href="#how-can-you-contact-us-about-this-notice">How can you contact us about this notice?</a>.</p>

              <h3>Account Information</h3>
              <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
              <ul>
                <li>Contact us using the contact information provided.</li>
              </ul>

              <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>

              <h3>Data Deletion Rights</h3>
              <p><strong>You have the right to request deletion of your personal information.</strong> To request deletion of your personal data, including any information obtained through Google OAuth, please:</p>
              <ul>
                <li>Email us at info@collektiv.club with the subject line "Data Deletion Request"</li>
                <li>Include your account email address and specify what data you want deleted</li>
                <li>Allow up to 30 days for processing your request</li>
              </ul>

              <p>We will delete your personal information from our active systems within 30 days of receiving your request, except where we are required to retain certain information for legal or regulatory purposes.</p>

              <p>If you have questions or comments about your privacy rights, you may email us at Info@Collektiv.club.</p>

              <hr />

              <h2 id="controls-for-do-not-track-features">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
              <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>

              <hr />

              <h2 id="do-we-make-updates-to-this-notice">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
              <p><strong>In Short:</strong><br />
              Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>

              <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>

              <hr />

              <h2 id="how-can-you-contact-us-about-this-notice">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
              <p>If you have questions or comments about this notice, you may email us at info@collektiv.club or contact us by post at:</p>

              <p><strong>Collektiv Ltd</strong><br />
              4th Floor, 4 Tabernacle Street<br />
              London, United Kingdom, EC2A 4LU</p>

              <hr />

              <h2 id="how-can-you-review-update-or-delete-the-data-we-collect-from-you">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
              <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please <a href="https://app.termly.io/notify/b2ff46fd-db4e-46af-8c7f-b46de404d940" target="_blank">fill out and submit a data subject access request</a>.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
