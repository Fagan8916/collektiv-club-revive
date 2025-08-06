import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { removeBackground, loadImage } from "@/utils/backgroundRemoval";

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  userFullName: string;
}

const ProfileImageUpload = ({ currentImageUrl, onImageUpload, userFullName }: ProfileImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to upload images");
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      onImageUpload(publicUrl);
      setPreviewUrl(null);
      toast.success("Profile image uploaded successfully!");
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackground = async () => {
    if (!previewUrl) return;

    try {
      setProcessing(true);
      toast.info("Removing background... This may take a moment.");

      // Convert preview URL to blob
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      
      // Load image and remove background
      const image = await loadImage(blob);
      const processedBlob = await removeBackground(image);
      
      // Convert processed blob to file
      const processedFile = new File([processedBlob], 'profile-image.png', { type: 'image/png' });
      
      // Upload the processed image
      await uploadImage(processedFile);
      
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error("Failed to remove background. Uploading original image instead.");
      
      // Fallback to uploading original image
      if (fileInputRef.current?.files?.[0]) {
        await uploadImage(fileInputRef.current.files[0]);
      }
    } finally {
      setProcessing(false);
    }
  };

  const handleUploadOriginal = async () => {
    if (fileInputRef.current?.files?.[0]) {
      await uploadImage(fileInputRef.current.files[0]);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>Profile Image</Label>
      
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={previewUrl || currentImageUrl || ""} />
          <AvatarFallback className="text-lg">
            {getInitials(userFullName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCameraClick}
            disabled={uploading || processing}
          >
            <Camera className="h-4 w-4 mr-2" />
            Choose Photo
          </Button>
          
          {previewUrl && (
            <div className="flex space-x-2">
              <Button
                type="button"
                size="sm"
                onClick={handleRemoveBackground}
                disabled={uploading || processing}
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Remove Background
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUploadOriginal}
                disabled={uploading || processing}
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Upload Original
              </Button>
            </div>
          )}
        </div>
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-sm text-muted-foreground">
        Choose a photo to upload. We can automatically remove the background for a professional look.
      </p>
    </div>
  );
};

export default ProfileImageUpload;