import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalDetailsStepProps {
  data: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const PersonalDetailsStep = ({ data, onChange }: PersonalDetailsStepProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground">Personal Details</h2>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Citizen Type</Label>
        <RadioGroup
          value={data.citizenType || ""}
          onValueChange={(v) => onChange("citizenType", v)}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="birth" id="birth" />
            <Label htmlFor="birth" className="cursor-pointer text-sm">By Birth</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="registration" id="registration" />
            <Label htmlFor="registration" className="cursor-pointer text-sm">By Registration</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={data.firstName || ""} onChange={(e) => onChange("firstName", e.target.value)} placeholder="Enter first name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input id="middleName" value={data.middleName || ""} onChange={(e) => onChange("middleName", e.target.value)} placeholder="Enter middle name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={data.lastName || ""} onChange={(e) => onChange("lastName", e.target.value)} placeholder="Enter last name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" value={data.dob || ""} onChange={(e) => onChange("dob", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <Input id="placeOfBirth" value={data.placeOfBirth || ""} onChange={(e) => onChange("placeOfBirth", e.target.value)} placeholder="e.g. Nairobi" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tribe">Tribe</Label>
          <Input id="tribe" value={data.tribe || ""} onChange={(e) => onChange("tribe", e.target.value)} placeholder="Enter tribe" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Gender</Label>
          <Select value={data.gender || ""} onValueChange={(v) => onChange("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="residence">Place of Residence</Label>
          <Input id="residence" value={data.residence || ""} onChange={(e) => onChange("residence", e.target.value)} placeholder="e.g. Westlands, Nairobi" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Education Level</Label>
        <Select value={data.education || ""} onValueChange={(v) => onChange("education", v)}>
          <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
