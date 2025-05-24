
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const catalogs = [
  {
    title: "2024 Client Catalog",
    description: "All our published work for clients in 2024.",
    url: "https://drive.google.com/drive/folders/<<EXAMPLE_FOLDER_ID_A>>",
  },
  {
    title: "Startup Investment Guide",
    description: "A curated set of resources for early-stage founders.",
    url: "https://drive.google.com/file/d/<<EXAMPLE_FILE_ID_B>>/view",
  },
  // Add more items as needed!
];

const Members = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login", { replace: true });
    });
    return () => { listener?.subscription?.unsubscribe(); };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 bg-gradient-to-r from-collektiv-accent to-white">
      <h1 className="text-3xl font-bold mb-4 text-collektiv-green">Members Zone</h1>
      <div className="max-w-xl w-full bg-white p-6 rounded shadow-lg mb-8">
        <div className="grid gap-6">
          {catalogs.map((cat, i) => (
            <a
              href={cat.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="block border p-4 rounded hover:shadow transition bg-gray-50 hover:bg-collektiv-accent"
            >
              <div className="flex items-center">
                <ExternalLink className="text-collektiv-green mr-3" size={18} />
                <div>
                  <div className="font-bold">{cat.title}</div>
                  <div className="text-sm text-gray-600">{cat.description}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <Button variant="secondary" onClick={handleLogout} className="mt-6 w-full">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Members;
