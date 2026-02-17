import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint, Check, AlertCircle } from "lucide-react";

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
  const [activeScanId, setActiveScanId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = (scanId: string) => {
    if (scannedFingers.includes(scanId) || isScanning) return;

    setIsPressed(true);
    setActiveScanId(scanId);
    setIsScanning(true);
    setScanProgress(0);

    // Progress bar update every 100ms (5 seconds total = 50 iterations)
    progressTimerRef.current = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 2; // 100ms * 50 = 5000ms (5 seconds)
        
        // Auto-complete when progress reaches 100%
        if (newProgress >= 100) {
          completeScan(scanId);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const handlePressEnd = () => {
    setIsPressed(false);

    // If user lifts before scan is complete, cancel it
    if (isScanning && scanProgress < 100) {
      setIsScanning(false);
      setScanProgress(0);
      setActiveScanId(null);

      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
  };

  const completeScan = (scanId: string) => {
    setIsScanning(false);
    setIsPressed(false);
    setScanProgress(100);
    setShowSuccess(scanId);

    // Clear timers
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    // Update scanned fingers
    const updated = [...scannedFingers, scanId];
    onScan(updated);

    // Hide success message and reset after 2 seconds
    setTimeout(() => {
      setShowSuccess(null);
      setActiveScanId(null);
      setScanProgress(0);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  const renderFingersGuide = (isLeft: boolean, isFourFingers: boolean) => {
    const handLabel = isLeft ? "Left" : "Right";
    
    if (isFourFingers) {
      return (
        <svg viewBox="0 0 200 280" className="w-full max-w-sm mx-auto">
          <rect x="30" y="150" width="140" height="100" rx="20" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          
          <circle cx="55" cy="80" r="18" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="55" cy="50" r="14" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="55" y="95" textAnchor="middle" fontSize="12" fill="#666">Index</text>
          
          <circle cx="100" cy="40" r="18" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="100" cy="10" r="14" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#666">Middle</text>
          
          <circle cx="145" cy="80" r="18" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="145" cy="50" r="14" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="145" y="95" textAnchor="middle" fontSize="12" fill="#666">Ring</text>
          
          <circle cx="170" cy="130" r="16" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx="170" cy="105" r="12" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          <text x="170" y="160" textAnchor="middle" fontSize="11" fill="#666">Pinky</text>
          
          <text x="100" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            {handLabel} Hand - Four Fingers
          </text>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 200 280" className="w-full max-w-sm mx-auto">
          <rect x="40" y="160" width="120" height="90" rx="15" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          
          <circle cx={isLeft ? "60" : "140"} cy="120" r="22" fill="#e8dcc8" stroke="#999" strokeWidth="2"/>
          <circle cx={isLeft ? "60" : "140"} cy="85" r="16" fill="#fff" stroke="#ddd" strokeWidth="1"/>
          
          <circle cx={isLeft ? "150" : "50"} cy="100" r="12" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          <circle cx={isLeft ? "130" : "70"} cy="60" r="12" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          <circle cx={isLeft ? "110" : "90"} cy="50" r="12" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          <circle cx={isLeft ? "170" : "30"} cy="100" r="11" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          
          <text x="100" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
            {handLabel} Thumb Only
          </text>
        </svg>
      );
    }
  };

  const renderScannerSection = (scanId: string, stepNumber: number) => {
    const scanData = SCANS.find(s => s.id === scanId);
    if (!scanData) return null;

    const isCompleted = scannedFingers.includes(scanId);
    const isActive = activeScanId === scanId;
    const canInitiateScan = !isCompleted && (
      (scanId === "right_thumb") ||
      (scanId === "right_four" && scannedFingers.includes("right_thumb")) ||
      (scanId === "left_thumb" && scannedFingers.includes("right_four")) ||
      (scanId === "left_four" && scannedFingers.includes("left_thumb"))
    );

    return (
      <div key={scanId} className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              {stepNumber}. {scanData.label}
            </h3>
            {isCompleted && (
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <Check className="h-4 w-4" /> Done
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{scanData.description}</p>
          
          <div className="flex justify-center py-4">
            {renderFingersGuide(scanId.includes("left"), scanId.includes("four"))}
          </div>

          {/* Scanner Container */}
          {isCompleted ? (
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-8 text-center">
              <Check className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-600">Scan Complete</p>
            </div>
          ) : isActive ? (
            <div
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchEnd={handlePressEnd}
              className={`relative w-full p-8 rounded-lg border-4 flex flex-col items-center justify-center transition-all ${
                showSuccess === scanId
                  ? "border-green-500 bg-green-100"
                  : isScanning
                  ? "border-green-500 bg-green-50 animate-pulse"
                  : "border-blue-500 bg-blue-50"
              }`}
              style={{ minHeight: "200px" }}
            >
              {showSuccess === scanId ? (
                <div className="text-center">
                  <Check className="h-16 w-16 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-green-600">Scan Successful!</p>
                </div>
              ) : (
                <>
                  <Fingerprint className={`h-16 w-16 mb-4 ${isScanning ? "text-green-600 animate-pulse" : "text-blue-600"}`} />
                  <p className="text-lg font-bold text-foreground mb-2">Place Here</p>
                  
                  {isScanning && (
                    <>
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-300 rounded-full h-3 mb-3 overflow-hidden">
                        <div
                          className="bg-green-500 h-full transition-all duration-100"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      
                      {/* Timer */}
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">
                          {Math.max(0, Math.ceil((100 - scanProgress) / 20))}s
                        </p>
                        {scanProgress >= 100 ? (
                          <p className="text-xs text-green-600 mt-2 font-semibold">Scan Complete!</p>
                        ) : (
                          <p className="text-xs text-green-600 mt-2">Keep your finger pressed...</p>
                        )}
                      </div>
                    </>
                  )}
                  
                  {!isScanning && !showSuccess[scanId] && (
                    <p className="text-xs text-gray-600 text-center mt-2">
                      Hold your finger for full scan
                    </p>
                  )}
                </>
              )}
            </div>
          ) : (
            <button
              onMouseDown={() => canInitiateScan && handlePressStart(scanId)}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={() => canInitiateScan && handlePressStart(scanId)}
              onTouchEnd={handlePressEnd}
              disabled={!canInitiateScan}
              className={`w-full py-4 rounded-lg border-2 font-medium transition-all ${
                !canInitiateScan
                  ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed opacity-50"
                  : "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              {!canInitiateScan ? (
                <span className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-4 w-4" /> Complete Previous Step
                </span>
              ) : (
                `Scan ${scanData.label}`
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Fingerprint Scan</h2>
      <p className="text-sm text-muted-foreground">
        Follow each scan in order. Press and hold your finger on the green scanner. The countdown will start and complete in 5 seconds. If you lift before reaching 0, the scan will cancel.
      </p>

      {/* RIGHT THUMB */}
      {renderScannerSection("right_thumb", 1)}

      {/* RIGHT FOUR FINGERS */}
      {renderScannerSection("right_four", 2)}

      {/* LEFT THUMB */}
      {scannedFingers.includes("right_four") && renderScannerSection("left_thumb", 3)}

      {/* LEFT FOUR FINGERS */}
      {scannedFingers.includes("left_thumb") && renderScannerSection("left_four", 4)}

      {/* SUCCESS STATE */}
      {scannedFingers.length === 4 && (
        <div className="rounded-lg bg-green-50 border border-green-300 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-base font-semibold text-green-700">All scans completed!</p>
                <p className="text-sm text-green-600">You can now proceed to the next step.</p>
              </div>
            </div>
          </div>
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
