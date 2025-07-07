import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const BulkMemberImport = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [memberList, setMemberList] = useState("");
  const [loading, setLoading] = useState(false);
  const [importedMembers, setImportedMembers] = useState<Array<{name: string, email: string, status: string}>>([]);

  const processMemberList = () => {
    const lines = memberList.trim().split('\n');
    const members = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      
      // Try to parse different formats
      if (trimmedLine.includes(',')) {
        // Format: "Name, email@example.com"
        const [name, email] = trimmedLine.split(',').map(s => s.trim());
        if (name && email && email.includes('@')) {
          members.push({ name, email });
        }
      } else if (trimmedLine.includes(' - ')) {
        // Format: "Name - email@example.com"
        const [name, email] = trimmedLine.split(' - ').map(s => s.trim());
        if (name && email && email.includes('@')) {
          members.push({ name, email });
        }
      } else if (trimmedLine.includes('\t')) {
        // Format: "Name    email@example.com" (tab separated)
        const [name, email] = trimmedLine.split('\t').map(s => s.trim());
        if (name && email && email.includes('@')) {
          members.push({ name, email });
        }
      } else {
        // Single line might be just email, skip or handle differently
        if (trimmedLine.includes('@')) {
          const email = trimmedLine;
          const name = email.split('@')[0]; // Use email prefix as name
          members.push({ name, email });
        }
      }
    }
    
    return members;
  };

  const handleBulkImport = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in as an admin to import members.",
        variant: "destructive",
      });
      return;
    }

    const members = processMemberList();
    if (members.length === 0) {
      toast({
        title: "No valid members found",
        description: "Please check your format. Use: Name, email@example.com (one per line)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const results = [];

    for (const member of members) {
      try {
        // Check if profile already exists
        const { data: existingProfile } = await supabase
          .from('member_profiles')
          .select('full_name')
          .eq('full_name', member.name)
          .maybeSingle();

        if (existingProfile) {
          results.push({ ...member, status: 'Already exists' });
          continue;
        }

        // Create basic profile entry
        const { error } = await supabase
          .from('member_profiles')
          .insert({
            user_id: crypto.randomUUID(), // Temporary ID until they log in
            full_name: member.name,
            bio: `Member of the Collektiv Club - Profile pending completion`,
            is_visible: false, // Hide until they complete their profile
          });

        if (error) {
          console.error("Error creating profile for", member.name, error);
          results.push({ ...member, status: 'Failed to create' });
        } else {
          results.push({ ...member, status: 'Created successfully' });
        }
      } catch (error) {
        console.error("Error processing member", member.name, error);
        results.push({ ...member, status: 'Error occurred' });
      }
    }

    setImportedMembers(results);
    setLoading(false);
    
    const successCount = results.filter(r => r.status === 'Created successfully').length;
    toast({
      title: "Import completed",
      description: `${successCount} members imported successfully out of ${results.length} total.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-collektiv-green">Bulk Member Import</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Member List (one per line)
            </label>
            <Textarea
              placeholder={`Enter members in any of these formats:
John Smith, john@example.com
Jane Doe - jane@example.com
Bob Wilson    bob@example.com
alice@example.com

One member per line`}
              value={memberList}
              onChange={(e) => setMemberList(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          
          <Button 
            onClick={handleBulkImport}
            disabled={loading || !memberList.trim()}
            className="w-full bg-collektiv-green hover:bg-collektiv-dark text-white"
          >
            {loading ? "Importing..." : "Import Members"}
          </Button>
        </CardContent>
      </Card>

      {importedMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-collektiv-green">Import Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {importedMembers.map((member, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded border flex justify-between items-center ${
                    member.status === 'Created successfully' 
                      ? 'bg-green-50 border-green-200' 
                      : member.status === 'Already exists'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    member.status === 'Created successfully'
                      ? 'bg-green-100 text-green-800'
                      : member.status === 'Already exists'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong> Contact the successfully imported members and ask them to:
                <br />1. Sign up/log in to the platform
                <br />2. Go to Member Directory → Submit Profile 
                <br />3. Complete their profile information
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkMemberImport;