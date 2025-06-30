import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const FormField = ({ control, name, label, placeholder, type }: FormFieldProps) => (
  <div className="form-field">
    <Label htmlFor={name}>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input id={name} placeholder={placeholder} type={type} {...field} />
      )}
    />
  </div>
);

export default FormField;