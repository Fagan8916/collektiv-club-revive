
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, CheckCircle } from "lucide-react";

const PendingApproval = () => {
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

  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.split(' ')[0];
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-yellow-100 rounded-full w-fit">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-collektiv-green">
                Membership Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Hello {getDisplayName()},
                </p>
                <p className="text-gray-600">
                  Thank you for registering with Collektiv Club. Your membership application has been received and is currently under review by our admin team.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>Registered with: {user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Application Submitted</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-yellow-600">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Awaiting Admin Review</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                  <span>Access Granted</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>What happens next?</strong><br />
                  Our admin team will review your application and approve your membership. 
                  You'll receive email notification once approved and can then access the full member area.
                </p>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <Button variant="outline" onClick={handleLogout}>
                  Sign Out
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-collektiv-green hover:bg-collektiv-dark"
                >
                  Check Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
