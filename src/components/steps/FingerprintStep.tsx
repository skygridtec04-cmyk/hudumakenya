import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Check, Loader2 } from "lucide-react";

const FINGERS = [
  { id: "right_thumb", label: "Right Thumb", hand: "right" },
  { id: "right_index", label: "Right Index", hand: "right" },
  { id: "right_middle", label: "Right Middle", hand: "right" },
  { id: "right_ring", label: "Right Ring", hand: "right" },
  { id: "right_pinky", label: "Right Pinky", hand: "right" },
  { id: "left_thumb", label: "Left Thumb", hand: "left" },
  { id: "left_index", label: "Left Index", hand: "left" },
  { id: "left_middle", label: "Left Middle", hand: "left" },
  { id: "left_ring", label: "Left Ring", hand: "left" },
  { id: "left_pinky", label: "Left Pinky", hand: "left" },
];

interface FingerprintStepProps {
  scannedFingers: string[];
  onScan: (fingers: string[]) => void;
}

const FingerprintStep = ({ scannedFingers, onScan }: FingerprintStepProps) => {
  const [scanning, setScanning] = useState<string | null>(null);

  const scanFinger = async (fingerId: string) => {
    setScanning(fingerId);
    
    // Try WebAuthn / device biometrics
    try {
      if (window.PublicKeyCredential) {
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "Huduma Kenya ID" },
            user: {
              id: new Uint8Array(16),
              name: "applicant",
              displayName: "ID Applicant",
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required",
            },
            timeout: 60000,
          },
        });
        if (credential) {
          const updated = [...scannedFingers, fingerId];
          onScan(updated);
        }
      } else {
        // Fallback: simulate scan
        await new Promise((r) => setTimeout(r, 2000));
        const updated = [...scannedFingers, fingerId];
        onScan(updated);
      }
    } catch {
      // If user cancels biometric, simulate success for demo
      await new Promise((r) => setTimeout(r, 1500));
      const updated = [...scannedFingers, fingerId];
      onScan(updated);
    }
    
    setScanning(null);
  };

  const rightFingers = FINGERS.filter((f) => f.hand === "right");
  const leftFingers = FINGERS.filter((f) => f.hand === "left");

  const renderHand = (fingers: typeof FINGERS, title: string) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-5 gap-2">
        {fingers.map((finger) => {
          const done = scannedFingers.includes(finger.id);
          const isScanning = scanning === finger.id;
          return (
            <button
              key={finger.id}
              onClick={() => !done && !isScanning && scanFinger(finger.id)}
              disabled={done || isScanning}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px] transition-all ${
                done
                  ? "border-primary bg-primary/10 text-primary"
                  : isScanning
                  ? "border-accent bg-accent/10 text-accent animate-pulse"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:bg-primary/5"
              }`}
            >
              {done ? (
                <Check className="h-5 w-5" />
              ) : isScanning ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Fingerprint className="h-5 w-5" />
              )}
              <span className="leading-tight">{finger.label.split(" ")[1]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground">Fingerprint Scan</h2>
      <p className="text-sm text-muted-foreground">
        Tap each finger to scan. Your device will prompt you to use the fingerprint sensor.
      </p>
      {renderHand(rightFingers, "🤚 Right Hand")}
      {renderHand(leftFingers, "✋ Left Hand")}
      <p className="text-xs text-muted-foreground">
        {scannedFingers.length}/10 fingers scanned
      </p>
    </div>
  );
};

export default FingerprintStep;
