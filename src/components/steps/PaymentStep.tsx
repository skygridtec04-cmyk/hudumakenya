import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PaymentStepProps {
  mpesaMessage: string;
  onMessageChange: (msg: string) => void;
}

const PaymentStep = ({ mpesaMessage, onMessageChange }: PaymentStepProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground">Payment</h2>

      <div className="rounded-lg border border-primary bg-primary/5 p-4 space-y-3">
        <h3 className="font-semibold text-primary">M-Pesa Payment Instructions</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
          <li>Go to M-Pesa on your phone</li>
          <li>Select <strong>Lipa na M-Pesa</strong></li>
          <li>Select <strong>Buy Goods and Services</strong></li>
          <li>Enter Till Number: <span className="font-bold text-primary">6905899</span></li>
          <li>Enter Amount: <span className="font-bold text-primary">KES 4,000</span></li>
          <li>Enter your M-Pesa PIN and confirm</li>
        </ol>
        <div className="flex items-center gap-2 rounded-md bg-card p-3 text-sm">
          <span className="text-muted-foreground">Business Name:</span>
          <span className="font-bold text-foreground">SKYGRID</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mpesa-msg">Paste M-Pesa Confirmation Message</Label>
        <Textarea
          id="mpesa-msg"
          rows={4}
          value={mpesaMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="e.g. SG45XXXX Confirmed. Ksh4,000.00 paid to SKYGRID..."
          className="text-sm"
        />
      </div>

      <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-destructive">⚠️ WARNING</h4>
            <p className="text-xs leading-relaxed text-foreground">
              If the M-Pesa confirmation message is faked, altered, or the transaction was not
              completed, <strong>you will be permanently banned</strong> from applying for a
              National ID through this portal. All submitted information will be flagged and
              reported to the relevant authorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
