import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, RotateCcw, Image } from "lucide-react";

interface PhotoCaptureStepProps {
  photo: string | null;
  onCapture: (photo: string) => void;
}

const PhotoCaptureStep = ({ photo, onCapture }: PhotoCaptureStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onCapture(result);
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const removePhoto = () => {
    onCapture("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Passport Photo</h2>
      <p className="text-sm text-muted-foreground">
        Upload a clear passport-style photo. Ensure good lighting, face the camera directly, and keep a neutral expression.
      </p>

      <div className="flex justify-center">
        <div className="relative h-72 w-56 overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted">
          {photo ? (
            <img src={photo} alt="Uploaded" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <Image className="h-12 w-12" />
              <span className="text-sm">No photo uploaded</span>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-center text-sm text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex justify-center gap-3">
        {photo ? (
          <Button variant="outline" onClick={removePhoto}>
            <RotateCcw className="mr-2 h-4 w-4" /> Remove Photo
          </Button>
        ) : (
          <Button onClick={triggerFileInput}>
            <Upload className="mr-2 h-4 w-4" /> Upload Photo
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoCaptureStep;
