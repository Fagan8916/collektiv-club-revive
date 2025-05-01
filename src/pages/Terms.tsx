
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
              <h2>Terms of Service for The Collektiv Club</h2>
              
              <p>Last updated: 14 February 2023</p>
              
              <h3>Introduction</h3>
              <p>These terms and conditions outline the rules and regulations for the use of The Collektiv Club's Website, located at www.collektiv.club.</p>
              <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use The Collektiv Club if you do not agree to take all of the terms and conditions stated on this page.</p>
              
              <h3>Interpretation and Definitions</h3>
              <p><strong>Interpretation</strong><br />
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
              
              <p><strong>Definitions</strong><br />
              For the purposes of these Terms and Conditions:</p>
              <ul>
                <li><strong>"Company"</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to The Collektiv Club.</li>
                <li><strong>"Device"</strong> means any device that can access the Website such as a computer, a cellphone or a digital tablet.</li>
                <li><strong>"Service"</strong> refers to the Website.</li>
                <li><strong>"Website"</strong> refers to The Collektiv Club, accessible from www.collektiv.club</li>
                <li><strong>"You"</strong> means the individual accessing or using the Website, or the company, or other legal entity on behalf of which such individual is accessing or using the Website, as applicable.</li>
              </ul>
              
              <h3>Acknowledgment</h3>
              <p>These are the Terms and Conditions governing the use of this Website and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Website.</p>
              <p>Your access to and use of the Website is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Website.</p>
              <p>By accessing or using the Website You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Website.</p>
              
              <h3>Intellectual Property Rights</h3>
              <p>Other than the content You own, under these Terms, the Company and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
              <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
              
              <h3>Restrictions</h3>
              <p>You are specifically restricted from all of the following:</p>
              <ul>
                <li>Publishing any Website material in any other media;</li>
                <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>Publicly performing and/or showing any Website material;</li>
                <li>Using this Website in any way that is or may be damaging to this Website;</li>
                <li>Using this Website in any way that impacts user access to this Website;</li>
                <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                <li>Using this Website to engage in any advertising or marketing.</li>
              </ul>
              <p>Certain areas of this Website are restricted from being access by You and the Company may further restrict access by You to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>
              
              <h3>Your Content</h3>
              <p>In these Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, You grant the Company a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
              <p>Your Content must be your own and must not be invading any third-party's rights. The Company reserves the right to remove any of Your Content from this Website at any time without notice.</p>
              
              <h3>No warranties</h3>
              <p>This Website is provided "as is," with all faults, and the Company express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising You.</p>
              
              <h3>Limitation of liability</h3>
              <p>In no event shall the Company, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. The Company, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
              
              <h3>Indemnification</h3>
              <p>You hereby indemnify to the fullest extent the Company from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
              
              <h3>Severability</h3>
              <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
              
              <h3>Variation of Terms</h3>
              <p>The Company is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
              
              <h3>Assignment</h3>
              <p>The Company is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
              
              <h3>Entire Agreement</h3>
              <p>These Terms constitute the entire agreement between the Company and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>
              
              <h3>Governing Law & Jurisdiction</h3>
              <p>These Terms will be governed by and interpreted in accordance with the laws of the UK, and you submit to the non-exclusive jurisdiction of the state and federal courts located in UK for the resolution of any disputes.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
