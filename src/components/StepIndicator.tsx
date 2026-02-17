import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span className="mt-1 max-w-[70px] text-center text-[10px] leading-tight text-muted-foreground">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-1 mt-[-16px] h-0.5 w-6 sm:w-10 ${
                index < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
