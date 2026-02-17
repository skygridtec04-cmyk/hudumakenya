import { CheckCircle2 } from "lucide-react";

const CompletionStep = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-xl font-bold text-foreground">Application Submitted!</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Your National ID application has been received and is being processed. You will be
        notified via SMS once your ID is ready for collection at the nearest Huduma Centre.
      </p>
      <div className="mt-2 rounded-lg border border-border bg-card p-4 text-sm">
        <div className="flex justify-between gap-8">
          <span className="text-muted-foreground">Status:</span>
          <span className="font-semibold text-primary">Under Review</span>
        </div>
        <div className="mt-2 flex justify-between gap-8">
          <span className="text-muted-foreground">Reference:</span>
          <span className="font-mono font-semibold text-foreground">
            HK-{Date.now().toString(36).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;
