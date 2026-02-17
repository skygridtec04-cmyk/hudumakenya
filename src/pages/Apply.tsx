import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import PersonalDetailsStep from "@/components/steps/PersonalDetailsStep";
import PhotoCaptureStep from "@/components/steps/PhotoCaptureStep";
import FingerprintStep from "@/components/steps/FingerprintStep";
import PaymentStep from "@/components/steps/PaymentStep";
import CompletionStep from "@/components/steps/CompletionStep";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Send, Home } from "lucide-react";

const STEPS = ["Details", "Photo", "Fingerprints", "Payment", "Complete"];

const Apply = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [scannedFingers, setScannedFingers] = useState<string[]>([]);
  const [mpesaMessage, setMpesaMessage] = useState("");

  const updateField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const canProceed = () => {
    switch (step) {
      case 0:
        return (
          formData.citizenType &&
          formData.firstName &&
          formData.lastName &&
          formData.dob &&
          formData.placeOfBirth &&
          formData.gender &&
          formData.residence &&
          formData.education
        );
      case 1:
        return !!photo;
      case 2:
        return scannedFingers.length === 10;
      case 3:
        return mpesaMessage.trim().length > 10;
      default:
        return false;
    }
  };

  const next = () => {
    if (!canProceed()) {
      toast.error("Please complete all required fields before proceeding.");
      return;
    }
    if (step === 3) {
      // Submit
      setStep(4);
      toast.success("Application submitted successfully!");
      return;
    }
    setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <StepIndicator steps={STEPS} currentStep={step} />
        <Card className="border-border shadow-lg">
          <CardContent className="p-5 sm:p-6">
            {step === 0 && <PersonalDetailsStep data={formData} onChange={updateField} />}
            {step === 1 && <PhotoCaptureStep photo={photo} onCapture={setPhoto} />}
            {step === 2 && <FingerprintStep scannedFingers={scannedFingers} onScan={setScannedFingers} />}
            {step === 3 && <PaymentStep mpesaMessage={mpesaMessage} onMessageChange={setMpesaMessage} />}
            {step === 4 && <CompletionStep />}
          </CardContent>
        </Card>

        {step < 4 && (
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={next} disabled={!canProceed()}>
              {step === 3 ? (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Application
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Apply;
