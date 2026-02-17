import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Check } from "lucide-react";

const SCANS = [
  { id: "right_thumb", label: "Right Thumb", description: "Place only your right thumb" },
  { id: "right_four", label: "Right Four Fingers", description: "Place index, middle, ring, and pinky fingers" },
  { id: "left_thumb", label: "Left Thumb", description: "Place only your left thumb" },
  { id: "left_four", label: "Left Four Fingers", description: "Place index, middle, ring, and pinky fingers" },
];

interface FingerprintStepProps {
  scannedFingers: string[];
  onScan: (fingers: string[]) => void;
}

const FingerprintStep = ({ scannedFingers, onScan }: FingerprintStepProps) => {
  const [isScanning, setIsScanning] = useState<string | null>(null);
  const [showTick, setShowTick] = useState<string | null>(null);

  const handleScan = async (scanId: string) => {
    if (scannedFingers.includes(scanId) || isScanning) return;

    setIsScanning(scanId);
    
    // Simulate fingerprint scanner reading
    await new Promise((r) => setTimeout(r, 2000));
    
    const updated = [...scannedFingers, scanId];
    onScan(updated);
    
    // Show tick confirmation
    setShowTick(scanId);
    setTimeout(() => setShowTick(null), 1500);
    
    setIsScanning(null);
  };

  const renderFingersGuide = (isLeft: boolean, isFourFingers: boolean) => {
    const handLabel = isLeft ? "Left" : "Right";
    
    if (isFourFingers) {
      // Show 4 fingers guide
      return (
        <svg viewBox="0 0 200 280" className="w-full max-w-sm mx-auto">
          {/* Palm area */}
          <rect x="30" y="150" width="140" height="100" rx="20" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          
          {/* Four fingers */}
          {/* Index */}
          <circle cx="55" cy="80" r="18" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="55" cy="50" r="14" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="55" y="95" textAnchor="middle" fontSize="12" fill="#666">Index</text>
          
          {/* Middle */}
          <circle cx="100" cy="40" r="18" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="100" cy="10" r="14" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#666">Middle</text>
          
          {/* Ring */}
          <circle cx="145" cy="80" r="18" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="145" cy="50" r="14" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="145" y="95" textAnchor="middle" fontSize="12" fill="#666">Ring</text>
          
          {/* Pinky */}
          <circle cx="170" cy="130" r="16" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="170" cy="105" r="12" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="170" y="160" textAnchor="middle" fontSize="11" fill="#666">Pinky</text>
          
          {/* Label */}
          <text x="100" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            {handLabel} Hand - Four Fingers
          </text>
        </svg>
      );
    } else {
      // Show thumb guide
      return (
        <svg viewBox="0 0 200 280" className="w-full max-w-sm mx-auto">
          {/* Palm area */}
          <rect x="40" y="160" width="120" height="90" rx="15" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          
          {/* Thumb */}
          <circle cx={isLeft ? "60" : "140"} cy="120" r="22" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx={isLeft ? "60" : "140"} cy="85" r="16" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          
          {/* Fingers outline (faded) */}
          <circle cx={isLeft ? "150" : "50"} cy="100" r="12" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          <circle cx={isLeft ? "130" : "70"} cy="60" r="12" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          <circle cx={isLeft ? "110" : "90"} cy="50" r="12" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          <circle cx={isLeft ? "170" : "30"} cy="100" r="11" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          
          {/* Label */}
          <text x="100" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            {handLabel} Thumb Only
          </text>
        </svg>
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Fingerprint Scan</h2>
      <p className="text-sm text-muted-foreground">
        Complete the scans in order. First right hand (thumb, then four fingers), then left hand (thumb, then four fingers).
      </p>

      {/* RIGHT THUMB */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">1. Right Thumb</h3>
            {scannedFingers.includes("right_thumb") && (
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <Check className="h-4 w-4" /> Done
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{SCANS[0].description}</p>
          
          <div className="flex justify-center py-4">
            {renderFingersGuide(false, false)}
          </div>

          <button
            onClick={() => handleScan("right_thumb")}
            disabled={scannedFingers.includes("right_thumb") || isScanning === "right_thumb"}
            className={`w-full py-3 rounded-lg border-2 font-medium transition-all ${
              scannedFingers.includes("right_thumb")
                ? "border-green-400 bg-green-50 text-green-600 cursor-not-allowed"
                : isScanning === "right_thumb"
                ? "border-blue-400 bg-blue-50 text-blue-600 animate-pulse"
                : "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
            }`}
          >
            {showTick === "right_thumb" ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5" /> Scanned!
              </span>
            ) : isScanning === "right_thumb" ? (
              <span className="flex items-center justify-center gap-2">
                <Fingerprint className="h-5 w-5 animate-pulse" /> Scanning...
              </span>
            ) : scannedFingers.includes("right_thumb") ? (
              "Completed"
            ) : (
              "Scan Right Thumb"
            )}
          </button>
        </div>
      </div>

      {/* RIGHT FOUR FINGERS */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">2. Right Four Fingers</h3>
            {scannedFingers.includes("right_four") && (
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <Check className="h-4 w-4" /> Done
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{SCANS[1].description}</p>
          
          <div className="flex justify-center py-4">
            {renderFingersGuide(false, true)}
          </div>

          <button
            onClick={() => handleScan("right_four")}
            disabled={!scannedFingers.includes("right_thumb") || scannedFingers.includes("right_four") || isScanning === "right_four"}
            className={`w-full py-3 rounded-lg border-2 font-medium transition-all ${
              scannedFingers.includes("right_four")
                ? "border-green-400 bg-green-50 text-green-600 cursor-not-allowed"
                : !scannedFingers.includes("right_thumb")
                ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed opacity-50"
                : isScanning === "right_four"
                ? "border-blue-400 bg-blue-50 text-blue-600 animate-pulse"
                : "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
            }`}
          >
            {!scannedFingers.includes("right_thumb") ? (
              "Complete Right Thumb First"
            ) : showTick === "right_four" ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5" /> Scanned!
              </span>
            ) : isScanning === "right_four" ? (
              <span className="flex items-center justify-center gap-2">
                <Fingerprint className="h-5 w-5 animate-pulse" /> Scanning...
              </span>
            ) : scannedFingers.includes("right_four") ? (
              "Completed"
            ) : (
              "Scan Right Four Fingers"
            )}
          </button>
        </div>
      </div>

      {/* LEFT THUMB */}
      {scannedFingers.includes("right_four") && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">3. Left Thumb</h3>
              {scannedFingers.includes("left_thumb") && (
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Done
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{SCANS[2].description}</p>
            
            <div className="flex justify-center py-4">
              {renderFingersGuide(true, false)}
            </div>

            <button
              onClick={() => handleScan("left_thumb")}
              disabled={scannedFingers.includes("left_thumb") || isScanning === "left_thumb"}
              className={`w-full py-3 rounded-lg border-2 font-medium transition-all ${
                scannedFingers.includes("left_thumb")
                  ? "border-green-400 bg-green-50 text-green-600 cursor-not-allowed"
                  : isScanning === "left_thumb"
                  ? "border-blue-400 bg-blue-50 text-blue-600 animate-pulse"
                  : "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              {showTick === "left_thumb" ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" /> Scanned!
                </span>
              ) : isScanning === "left_thumb" ? (
                <span className="flex items-center justify-center gap-2">
                  <Fingerprint className="h-5 w-5 animate-pulse" /> Scanning...
                </span>
              ) : scannedFingers.includes("left_thumb") ? (
                "Completed"
              ) : (
                "Scan Left Thumb"
              )}
            </button>
          </div>
        </div>
      )}

      {/* LEFT FOUR FINGERS */}
      {scannedFingers.includes("left_thumb") && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">4. Left Four Fingers</h3>
              {scannedFingers.includes("left_four") && (
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Done
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{SCANS[3].description}</p>
            
            <div className="flex justify-center py-4">
              {renderFingersGuide(true, true)}
            </div>

            <button
              onClick={() => handleScan("left_four")}
              disabled={scannedFingers.includes("left_four") || isScanning === "left_four"}
              className={`w-full py-3 rounded-lg border-2 font-medium transition-all ${
                scannedFingers.includes("left_four")
                  ? "border-green-400 bg-green-50 text-green-600 cursor-not-allowed"
                  : isScanning === "left_four"
                  ? "border-blue-400 bg-blue-50 text-blue-600 animate-pulse"
                  : "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              {showTick === "left_four" ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" /> Scanned!
                </span>
              ) : isScanning === "left_four" ? (
                <span className="flex items-center justify-center gap-2">
                  <Fingerprint className="h-5 w-5 animate-pulse" /> Scanning...
                </span>
              ) : scannedFingers.includes("left_four") ? (
                "Completed"
              ) : (
                "Scan Left Four Fingers"
              )}
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS STATE */}
      {scannedFingers.length === 4 && (
        <div className="rounded-lg bg-green-50 border border-green-300 p-4">
          <p className="text-sm font-semibold text-green-700 text-center flex items-center justify-center gap-2">
            <Check className="h-5 w-5" /> All fingerprints captured successfully!
          </p>
        </div>
      )}

      {/* PROGRESS */}
      <p className="text-center text-sm font-medium text-foreground">
        Progress: <span className="text-blue-600 font-semibold">{scannedFingers.length}</span>/4 scans completed
      </p>
    </div>
  );
};

export default FingerprintStep;
