
import React, { useState } from "react";
import SimpleRegistrationForm from "@/components/auth/SimpleRegistrationForm";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Register = () => {
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleSuccess = () => {
    setRegistrationComplete(true);
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-collektiv-green">
              Registration Complete!
            </h1>
            <p className="text-gray-600 mb-8">
              Your account has been created successfully. Please check your email to verify your account. Your membership application will be reviewed by our admins.
            </p>
            <a
              href="/login"
              className="inline-block bg-collektiv-green text-white px-6 py-2 rounded-md hover:bg-collektiv-dark transition-colors"
            >
              Go to Login
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-collektiv-accent via-white to-green-50 flex items-center justify-center p-4">
      <SimpleRegistrationForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Register;
