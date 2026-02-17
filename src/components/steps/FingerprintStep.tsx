import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Check } from "lucide-react";

const FINGERS = [
  { id: "right_thumb", label: "Right Thumb", position: "thumb-right" },
  { id: "right_index", label: "Right Index", position: "index-right" },
  { id: "right_middle", label: "Right Middle", position: "middle-right" },
  { id: "right_ring", label: "Right Ring", position: "ring-right" },
  { id: "right_pinky", label: "Right Pinky", position: "pinky-right" },
  { id: "left_thumb", label: "Left Thumb", position: "thumb-left" },
  { id: "left_index", label: "Left Index", position: "index-left" },
  { id: "left_middle", label: "Left Middle", position: "middle-left" },
  { id: "left_ring", label: "Left Ring", position: "ring-left" },
  { id: "left_pinky", label: "Left Pinky", position: "pinky-left" },
];

interface FingerprintStepProps {
  scannedFingers: string[];
  onScan: (fingers: string[]) => void;
}

const FingerprintStep = ({ scannedFingers, onScan }: FingerprintStepProps) => {
  const [currentFinger, setCurrentFinger] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showTick, setShowTick] = useState<string | null>(null);

  const nextUnscannedFinger = FINGERS.find((f) => !scannedFingers.includes(f.id));

  const handleScannerClick = async () => {
    if (!nextUnscannedFinger || isScanning) return;

    setIsScanning(true);
    
    // Simulate fingerprint scanner reading
    await new Promise((r) => setTimeout(r, 1500));
    
    const updated = [...scannedFingers, nextUnscannedFinger.id];
    onScan(updated);
    
    // Show tick confirmation
    setShowTick(nextUnscannedFinger.id);
    setTimeout(() => setShowTick(null), 1000);
    
    setIsScanning(false);
    
    // Auto-set next finger
    const nextFinger = FINGERS.find((f) => !updated.includes(f.id));
    setCurrentFinger(nextFinger?.id || null);
  };

  const renderHandDiagram = () => {
    return (
      <svg viewBox="0 0 200 300" className="w-full max-w-xs mx-auto">
        {/* Palm */}
        <ellipse cx="100" cy="180" rx="50" ry="70" fill="#f0f0f0" stroke="#999" strokeWidth="2" />
        
        {/* Thumb Right */}
        <g>
          <circle cx="70" cy="140" r="15" 
            fill={scannedFingers.includes("right_thumb") ? "#4ade80" : nextUnscannedFinger?.id === "right_thumb" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "right_thumb" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("right_thumb") && (
            <text x="70" y="147" textAnchor="middle" className="text-sm font-bold fill-white">✓</text>
          )}
          <text x="70" y="165" textAnchor="middle" className="text-xs fill-gray-600">R Thumb</text>
        </g>

        {/* Index Right */}
        <g>
          <circle cx="55" cy="90" r="12" 
            fill={scannedFingers.includes("right_index") ? "#4ade80" : nextUnscannedFinger?.id === "right_index" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "right_index" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("right_index") && (
            <text x="55" y="97" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Middle Right */}
        <g>
          <circle cx="70" cy="50" r="12" 
            fill={scannedFingers.includes("right_middle") ? "#4ade80" : nextUnscannedFinger?.id === "right_middle" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "right_middle" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("right_middle") && (
            <text x="70" y="56" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Ring Right */}
        <g>
          <circle cx="90" cy="40" r="12" 
            fill={scannedFingers.includes("right_ring") ? "#4ade80" : nextUnscannedFinger?.id === "right_ring" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "right_ring" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("right_ring") && (
            <text x="90" y="46" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Pinky Right */}
        <g>
          <circle cx="110" cy="50" r="12" 
            fill={scannedFingers.includes("right_pinky") ? "#4ade80" : nextUnscannedFinger?.id === "right_pinky" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "right_pinky" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("right_pinky") && (
            <text x="110" y="56" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Thumb Left */}
        <g>
          <circle cx="130" cy="140" r="15" 
            fill={scannedFingers.includes("left_thumb") ? "#4ade80" : nextUnscannedFinger?.id === "left_thumb" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "left_thumb" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("left_thumb") && (
            <text x="130" y="147" textAnchor="middle" className="text-sm font-bold fill-white">✓</text>
          )}
          <text x="130" y="165" textAnchor="middle" className="text-xs fill-gray-600">L Thumb</text>
        </g>

        {/* Index Left */}
        <g>
          <circle cx="145" cy="90" r="12" 
            fill={scannedFingers.includes("left_index") ? "#4ade80" : nextUnscannedFinger?.id === "left_index" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "left_index" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("left_index") && (
            <text x="145" y="97" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Middle Left */}
        <g>
          <circle cx="130" cy="50" r="12" 
            fill={scannedFingers.includes("left_middle") ? "#4ade80" : nextUnscannedFinger?.id === "left_middle" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "left_middle" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("left_middle") && (
            <text x="130" y="56" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Ring Left */}
        <g>
          <circle cx="110" cy="40" r="12" 
            fill={scannedFingers.includes("left_ring") ? "#4ade80" : nextUnscannedFinger?.id === "left_ring" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "left_ring" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("left_ring") && (
            <text x="110" y="46" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>

        {/* Pinky Left */}
        <g>
          <circle cx="90" cy="50" r="12" 
            fill={scannedFingers.includes("left_pinky") ? "#4ade80" : nextUnscannedFinger?.id === "left_pinky" ? "#fbbf24" : "#e5e5e5"}
            stroke={nextUnscannedFinger?.id === "left_pinky" ? "#f59e0b" : "#999"}
            strokeWidth="2"
          />
          {scannedFingers.includes("left_pinky") && (
            <text x="90" y="56" textAnchor="middle" className="text-xs font-bold fill-white">✓</text>
          )}
        </g>
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Fingerprint Scan</h2>
      <p className="text-sm text-muted-foreground">
        Place your finger on the scanner below. The highlighted finger shows which one to scan next.
      </p>

      {/* Hand Diagram */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 text-center">Finger Guide</h3>
        {renderHandDiagram()}
        {nextUnscannedFinger && (
          <p className="text-center mt-4 text-sm font-semibold text-amber-600">
            Next: {nextUnscannedFinger.label}
          </p>
        )}
      </div>

      {/* Scanner */}
      <div className="flex justify-center">
        <button
          onClick={handleScannerClick}
          disabled={isScanning || !nextUnscannedFinger}
          className={`relative w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all ${
            isScanning
              ? "border-accent bg-accent/20 animate-pulse"
              : nextUnscannedFinger
              ? "border-primary bg-primary/10 hover:bg-primary/20 cursor-pointer"
              : "border-gray-300 bg-gray-100 cursor-not-allowed opacity-50"
          }`}
        >
          {showTick ? (
            <div className="text-center">
              <Check className="h-16 w-16 text-green-500 mx-auto" />
              <p className="text-xs text-green-600 mt-2">Scanned!</p>
            </div>
          ) : (
            <div className="text-center">
              <Fingerprint className={`h-16 w-16 mx-auto ${isScanning ? "text-accent animate-pulse" : "text-primary"}`} />
              <p className="text-xs text-muted-foreground mt-2">
                {nextUnscannedFinger ? "Place Finger" : "Complete"}
              </p>
            </div>
          )}
        </button>
      </div>

      {/* Progress */}
      <p className="text-center text-sm font-medium text-foreground">
        <span className="text-primary">{scannedFingers.length}</span>/10 fingers scanned
      </p>

      {scannedFingers.length === 10 && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm font-semibold text-green-700 text-center">
            ✓ All fingerprints captured successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default FingerprintStep;
