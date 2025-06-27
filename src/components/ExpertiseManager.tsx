
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormLabel } from "@/components/ui/form";
import { X, Plus } from "lucide-react";

interface ExpertiseManagerProps {
  expertise: string[];
  newSkill: string;
  onNewSkillChange: (value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
}

const ExpertiseManager = ({ 
  expertise, 
  newSkill, 
  onNewSkillChange, 
  onAddSkill, 
  onRemoveSkill 
}: ExpertiseManagerProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddSkill();
    }
  };

  return (
    <div>
      <FormLabel>Areas of Expertise</FormLabel>
      <div className="flex gap-2 mt-2 mb-3">
        <Input
          placeholder="Add a skill..."
          value={newSkill}
          onChange={(e) => onNewSkillChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={onAddSkill} size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {expertise.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="ml-2 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertiseManager;
