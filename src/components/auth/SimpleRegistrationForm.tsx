import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Loader2 } from "lucide-react";

interface SimpleRegistrationFormProps {
  onSuccess: () => void;
}

const SimpleRegistrationForm = ({ onSuccess }: SimpleRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) {
        console.error("Registration error:", error);
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Registration Successful!",
          description: "Please check your email to verify your account. Your membership application will be reviewed by our admins.",
        });
        onSuccess();
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-collektiv-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-collektiv-green" />
            </div>
            <h1 className="text-2xl font-bold text-collektiv-green">Join Collektiv Club</h1>
            <p className="text-gray-600 mt-2">Create your account and apply for membership</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Choose a secure password"
                minLength={6}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-collektiv-green hover:bg-collektiv-dark" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </>
            )}
          </Button>

          <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-blue-50 rounded-lg">
            <strong>What happens next?</strong><br />
            1. Verify your email address<br />
            2. Admin reviews your application<br />
            3. You'll receive confirmation when approved
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <a href="/login" className="text-collektiv-green hover:text-collektiv-dark underline">
              Sign in
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SimpleRegistrationForm;