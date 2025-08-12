
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ProfileSubmissionSuccessScreen = () => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-collektiv-green mb-2">Profile Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for submitting your profile. An admin will review it and you'll be notified once it's approved and added to the member directory.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSubmissionSuccessScreen;
