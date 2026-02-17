import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw } from "lucide-react";

interface PhotoCaptureStepProps {
  photo: string | null;
  onCapture: (photo: string) => void;
}

const PhotoCaptureStep = ({ photo, onCapture }: PhotoCaptureStepProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");

  const startCamera = useCallback(async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 640 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      setError("Camera access denied. Please allow camera permissions.");
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, 480, 640);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      onCapture(dataUrl);
      // Stop stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
      setStreaming(false);
    }
  }, [onCapture]);

  const retake = () => {
    onCapture("");
    startCamera();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Passport Photo</h2>
      <p className="text-sm text-muted-foreground">
        Take a clear passport-style photo. Ensure good lighting, face the camera directly, and keep a neutral expression.
      </p>

      <div className="flex justify-center">
        <div className="relative h-72 w-56 overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted">
          {photo ? (
            <img src={photo} alt="Captured" className="h-full w-full object-cover" />
          ) : streaming ? (
            <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <Camera className="h-12 w-12" />
              <span className="text-sm">No photo taken</span>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-center text-sm text-destructive">{error}</p>}

      <div className="flex justify-center gap-3">
        {photo ? (
          <Button variant="outline" onClick={retake}>
            <RotateCcw className="mr-2 h-4 w-4" /> Retake Photo
          </Button>
        ) : streaming ? (
          <Button onClick={capturePhoto}>
            <Camera className="mr-2 h-4 w-4" /> Capture Photo
          </Button>
        ) : (
          <Button onClick={startCamera}>
            <Camera className="mr-2 h-4 w-4" /> Open Camera
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoCaptureStep;
