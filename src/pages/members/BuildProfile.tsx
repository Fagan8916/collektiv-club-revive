import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileSubmissionForm from "@/components/ProfileSubmissionForm";
import LoadingScreen from "@/components/auth/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BuildProfile: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // SEO
    document.title = "Build Your Profile | Collektiv Club";
    const desc = "Build your member profile for the Collektiv Club directory.";
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) meta.content = desc;

    // Canonical tag
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${window.location.origin}/#/members/build-profile`);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const href = window.location.href;
      const hasAuthIndicators = /[?#&](access_token|refresh_token|code|provider_token|provider_refresh_token)=/.test(href) || href.includes('#access_token=');
      if (hasAuthIndicators) {
        // If auth tokens are present in URL, wait for processing
        return;
      }
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return null; // Redirecting

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-10 bg-gradient-to-r from-blue-50 to-white">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-collektiv-green">Build Your Member Profile</h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Share your expertise and be discoverable by other members. Submit your details below to join the directory.
            </p>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-3xl mx-auto">
            <article>
              <ProfileSubmissionForm />
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuildProfile;
