
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Text Input Component
export const TextInput = ({ 
  id, 
  label, 
  placeholder = "", 
  required = false,
  onChange
}: { 
  id: string; 
  label: string; 
  placeholder?: string; 
  required?: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agro-blue"
      />
    </div>
  );
};

// Email Input Component
export const EmailInput = ({ 
  id, 
  label, 
  placeholder = "", 
  required = false,
  onChange
}: { 
  id: string; 
  label: string; 
  placeholder?: string; 
  required?: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="email"
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agro-blue"
      />
    </div>
  );
};

// Phone Input Component
export const PhoneInput = ({ 
  id, 
  label, 
  placeholder = "", 
  required = false,
  onChange
}: { 
  id: string; 
  label: string; 
  placeholder?: string; 
  required?: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="tel"
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agro-blue"
      />
    </div>
  );
};

// Checkbox Group Component
export const CheckboxGroup = ({ 
  id, 
  label, 
  options, 
  hasOther = false,
  onChange
}: { 
  id: string; 
  label: string; 
  options: string[];
  hasOther?: boolean;
  onChange?: (values: string[], otherValue?: string) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherValue, setOtherValue] = useState<string>("");
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);

  const handleCheckboxChange = (option: string, checked: boolean) => {
    let newSelectedOptions;
    if (option === "Other" && checked) {
      setShowOtherInput(true);
      newSelectedOptions = [...selectedOptions.filter(item => item !== "Other"), "Other"];
    } else if (option === "Other" && !checked) {
      setShowOtherInput(false);
      setOtherValue("");
      newSelectedOptions = selectedOptions.filter(item => item !== "Other");
    } else if (checked) {
      newSelectedOptions = [...selectedOptions, option];
    } else {
      newSelectedOptions = selectedOptions.filter(item => item !== option);
    }
    
    setSelectedOptions(newSelectedOptions);
    onChange && onChange(newSelectedOptions, showOtherInput ? otherValue : undefined);
  };

  const handleOtherChange = (value: string) => {
    setOtherValue(value);
    onChange && onChange(selectedOptions, value);
  };

  return (
    <div className="mb-4">
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">{label}</legend>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={`${id}-${option}`} className="flex items-center">
              <input
                type="checkbox"
                id={`${id}-${option}`}
                name={id}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                className="h-4 w-4 text-agro-blue focus:ring-agro-blue border-gray-300 rounded"
              />
              <label 
                htmlFor={`${id}-${option}`} 
                className="ml-2 text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
          
          {hasOther && (
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`${id}-other`}
                  name={id}
                  value="Other"
                  checked={showOtherInput}
                  onChange={(e) => handleCheckboxChange("Other", e.target.checked)}
                  className="h-4 w-4 text-agro-blue focus:ring-agro-blue border-gray-300 rounded"
                />
                <label 
                  htmlFor={`${id}-other`} 
                  className="ml-2 text-sm text-gray-700"
                >
                  Other (Please specify)
                </label>
              </div>
              
              {showOtherInput && (
                <input
                  type="text"
                  id={`${id}-other-value`}
                  name={`${id}-other-value`}
                  value={otherValue}
                  onChange={(e) => handleOtherChange(e.target.value)}
                  className="mt-2 ml-6 w-[calc(100%-1.5rem)] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agro-blue"
                  placeholder="Please specify"
                />
              )}
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

// Dropdown Component
export const Dropdown = ({ 
  id, 
  label, 
  options, 
  required = false,
  onChange
}: { 
  id: string; 
  label: string; 
  options: string[];
  required?: boolean;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agro-blue bg-white"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Textarea Component
export const TextArea = ({ 
  id, 
  label, 
  placeholder = "", 
  required = false,
  rows = 3,
  onChange
}: { 
  id: string; 
  label: string; 
  placeholder?: string; 
  required?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agro-blue"
      ></textarea>
    </div>
  );
};

// Toggle (Yes/No) Component
export const Toggle = ({ 
  id, 
  label,
  onChange
}: { 
  id: string; 
  label: string;
  onChange?: (value: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mr-3"
        >
          {label}
        </label>
        <button
          type="button"
          id={id}
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isChecked ? 'bg-agro-green' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={isChecked}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isChecked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="ml-2 text-sm text-gray-700">
          {isChecked ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
};

// Date Picker Component
export const DatePicker = ({ 
  id, 
  label, 
  required = false,
  onChange
}: { 
  id: string; 
  label: string; 
  required?: boolean;
  onChange?: (date: Date | undefined) => void;
}) => {
  const [date, setDate] = useState<Date>();

  const handleDateChange = (selected: Date | undefined) => {
    setDate(selected);
    onChange && onChange(selected);
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border border-gray-300",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 pointer-events-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            className="p-3"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Submit Button Component
export const SubmitButton = ({ 
  text = "Submit",
  isLoading = false,
  onClick
}: { 
  text?: string;
  isLoading?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      className={`px-6 py-3 bg-agro-green text-white font-medium rounded-md hover:bg-opacity-90 transition-colors ${
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Submitting...' : text}
    </button>
  );
};
