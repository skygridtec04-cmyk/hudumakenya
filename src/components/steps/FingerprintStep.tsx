import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Check } from "lucide-react";

const FINGERS = [
  { id: "right_thumb", label: "Right Thumb", position: "thumb" },
  { id: "right_index", label: "Right Index", position: "index" },
  { id: "right_middle", label: "Right Middle", position: "middle" },
  { id: "right_ring", label: "Right Ring", position: "ring" },
  { id: "right_pinky", label: "Right Pinky", position: "pinky" },
  { id: "left_thumb", label: "Left Thumb", position: "thumb" },
  { id: "left_index", label: "Left Index", position: "index" },
  { id: "left_middle", label: "Left Middle", position: "middle" },
  { id: "left_ring", label: "Left Ring", position: "ring" },
  { id: "left_pinky", label: "Left Pinky", position: "pinky" },
];

interface FingerprintStepProps {
  scannedFingers: string[];
  onScan: (fingers: string[]) => void;
}

const FingerprintStep = ({ scannedFingers, onScan }: FingerprintStepProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showTick, setShowTick] = useState<string | null>(null);

  const rightHandFingers = FINGERS.slice(0, 5);
  const leftHandFingers = FINGERS.slice(5, 10);
  
  const rightHandComplete = rightHandFingers.every(f => scannedFingers.includes(f.id));
  const leftHandComplete = leftHandFingers.every(f => scannedFingers.includes(f.id));
  
  const nextUnscannedFinger = FINGERS.find((f) => !scannedFingers.includes(f.id));
  const isRightHandPhase = !rightHandComplete;

  const handleScannerClick = async () => {
    if (!nextUnscannedFinger || isScanning) return;
    if (!isRightHandPhase && nextUnscannedFinger.id.startsWith("right")) return;

    setIsScanning(true);
    
    // Simulate fingerprint scanner reading
    await new Promise((r) => setTimeout(r, 1500));
    
    const updated = [...scannedFingers, nextUnscannedFinger.id];
    onScan(updated);
    
    // Show tick confirmation
    setShowTick(nextUnscannedFinger.id);
    setTimeout(() => setShowTick(null), 1000);
    
    setIsScanning(false);
  };

  const renderRealHandDiagram = (isLeftHand: boolean) => {
    const handFingers = isLeftHand ? leftHandFingers : rightHandFingers;
    const currentFingerToScan = nextUnscannedFinger;
    
    // Define positions for each finger on the SVG (for right hand, flipped for left)
    const fingerPositions = {
      thumb: { cx: isLeftHand ? 80 : 120, cy: 200, r: 20 },
      index: { cx: isLeftHand ? 120 : 80, cy: 80, r: 18 },
      middle: { cx: isLeftHand ? 140 : 60, cy: 30, r: 18 },
      ring: { cx: isLeftHand ? 160 : 40, cy: 40, r: 18 },
      pinky: { cx: isLeftHand ? 175 : 25, cy: 70, r: 16 },
    };

    return (
      <svg viewBox="0 0 200 280" className="w-full max-w-sm mx-auto" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
        {/* Hand palm outline */}
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Palm */}
        <path
          d={isLeftHand 
            ? "M 80 220 Q 60 200 70 140 L 100 100 L 140 110 Q 150 180 120 240 Z"
            : "M 120 220 Q 140 200 130 140 L 100 100 L 60 110 Q 50 180 80 240 Z"
          }
          fill="#e8dcc8"
          stroke="#999"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
        
        {/* Fingers and nails */}
        {handFingers.map((finger) => {
          const positions = fingerPositions[finger.position as keyof typeof fingerPositions];
          const isCurrentFinger = currentFingerToScan?.id === finger.id;
          const isScanned = scannedFingers.includes(finger.id);
          
          return (
            <g key={finger.id}>
              {/* Finger outline */}
              <circle
                cx={positions.cx}
                cy={positions.cy}
                r={positions.r}
                fill={isCurrentFinger && !isScanned ? "#4ade80" : isScanned ? "#22c55e" : "#f5f5f5"}
                stroke={isCurrentFinger && !isScanned ? "#16a34a" : isScanned ? "#16a34a" : "#999"}
                strokeWidth="2"
                filter="url(#shadow)"
              />
              
              {/* Nail */}
              <circle
                cx={positions.cx}
                cy={positions.cy - positions.r * 0.5}
                r={positions.r * 0.4}
                fill={isCurrentFinger && !isScanned ? "#86efac" : isScanned ? "#4ade80" : "#fff"}
                stroke={isCurrentFinger && !isScanned ? "#16a34a" : isScanned ? "#16a34a" : "#ddd"}
                strokeWidth="1"
              />
              
              {/* Checkmark if scanned */}
              {isScanned && (
                <text x={positions.cx} y={positions.cy + 8} textAnchor="middle" className="text-lg font-bold fill-white">
                  ✓
                </text>
              )}
              
              {/* Highlight pulse if current finger */}
              {isCurrentFinger && !isScanned && (
                <circle
                  cx={positions.cx}
                  cy={positions.cy}
                  r={positions.r + 6}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  opacity="0.5"
                  style={{
                    animation: 'pulse 2s infinite'
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes pulse {
          0%, 100% { r: ${FINGERS[0]}px; opacity: 0.8; }
          50% { r: 35px; opacity: 0.3; }
        }
      `}</style>
      
      <h2 className="text-lg font-bold text-foreground">Fingerprint Scan</h2>
      <p className="text-sm text-muted-foreground">
        Place your finger on the scanner. Complete the right hand first, then the left hand.
      </p>

      {/* RIGHT HAND SECTION */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Right Hand</h3>
          {rightHandComplete && (
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <Check className="h-4 w-4" /> Complete
            </span>
          )}
        </div>
        <div className="flex justify-center mb-4">
          {renderRealHandDiagram(false)}
        </div>
        
        {!rightHandComplete && nextUnscannedFinger && (
          <p className="text-center text-sm font-semibold text-amber-600 mt-4">
            Next: {nextUnscannedFinger.label}
          </p>
        )}
      </div>

      {/* LEFT HAND SECTION */}
      {rightHandComplete && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Left Hand</h3>
            {leftHandComplete && (
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <Check className="h-4 w-4" /> Complete
              </span>
            )}
          </div>
          <div className="flex justify-center mb-4">
            {renderRealHandDiagram(true)}
          </div>
          
          {!leftHandComplete && nextUnscannedFinger && (
            <p className="text-center text-sm font-semibold text-amber-600 mt-4">
              Next: {nextUnscannedFinger.label}
            </p>
          )}
        </div>
      )}

      {/* SCANNER BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handleScannerClick}
          disabled={isScanning || !nextUnscannedFinger}
          className={`relative w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all ${
            isScanning
              ? "border-blue-400 bg-blue-50 animate-pulse"
              : nextUnscannedFinger
              ? "border-blue-500 bg-blue-50 hover:bg-blue-100 cursor-pointer"
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
              <Fingerprint className={`h-16 w-16 mx-auto ${isScanning ? "text-blue-500 animate-pulse" : "text-blue-600"}`} />
              <p className="text-xs text-muted-foreground mt-2">
                {nextUnscannedFinger ? "Place Finger" : "Complete"}
              </p>
            </div>
          )}
        </button>
      </div>

      {/* PROGRESS */}
      <p className="text-center text-sm font-medium text-foreground">
        <span className="text-blue-600 font-semibold">{scannedFingers.length}</span>/10 fingers scanned
      </p>

      {/* SUCCESS STATE */}
      {scannedFingers.length === 10 && (
        <div className="rounded-lg bg-green-50 border border-green-300 p-4">
          <p className="text-sm font-semibold text-green-700 text-center flex items-center justify-center gap-2">
            <Check className="h-5 w-5" /> All fingerprints captured successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default FingerprintStep;
