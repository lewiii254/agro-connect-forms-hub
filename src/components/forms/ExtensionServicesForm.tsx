
import { useState } from "react";
import { 
  TextInput, 
  EmailInput, 
  PhoneInput, 
  CheckboxGroup, 
  Dropdown, 
  TextArea, 
  DatePicker, 
  SubmitButton 
} from "./FormComponents";
import { toast } from "@/components/ui/sonner";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  farmSize: string;
  farmingTypes: string[];
  otherFarmingType?: string;
  interestAreas: string[];
  otherInterestArea?: string;
  challenges: string;
  deliveryMethod: string;
  trainingPreference: string;
  preferredDate?: Date;
  referralSource: string;
  otherReferralSource?: string;
}

const ExtensionServicesForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    farmSize: "",
    farmingTypes: [],
    interestAreas: [],
    challenges: "",
    deliveryMethod: "",
    trainingPreference: "",
    referralSource: "",
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your backend API
      console.log("Form data submitted:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Application submitted successfully! We'll contact you soon.");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        farmSize: "",
        farmingTypes: [],
        interestAreas: [],
        challenges: "",
        deliveryMethod: "",
        trainingPreference: "",
        referralSource: "",
      });
    } catch (error) {
      toast.error("There was an error submitting your application. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput 
        id="fullName" 
        label="Full Name" 
        required 
        onChange={(value) => updateFormData("fullName", value)}
      />
      
      <EmailInput 
        id="email" 
        label="Email Address" 
        required 
        onChange={(value) => updateFormData("email", value)}
      />
      
      <PhoneInput 
        id="phone" 
        label="Phone Number" 
        required 
        onChange={(value) => updateFormData("phone", value)}
      />
      
      <TextInput 
        id="location" 
        label="Location (Region/County)" 
        required 
        onChange={(value) => updateFormData("location", value)}
      />
      
      <TextInput 
        id="farmSize" 
        label="Farm Size (in acres)" 
        onChange={(value) => updateFormData("farmSize", value)}
      />
      
      <CheckboxGroup 
        id="farmingTypes" 
        label="Type of Agricultural Activity on Your Farm" 
        options={["Crop Farming", "Livestock Farming", "Agroforestry", "Mixed Farming"]} 
        hasOther
        onChange={(values, otherValue) => {
          updateFormData("farmingTypes", values);
          if (otherValue !== undefined) {
            updateFormData("otherFarmingType", otherValue);
          }
        }}
      />
      
      <CheckboxGroup 
        id="interestAreas" 
        label="Specific Area of Interest for Extension Services" 
        options={[
          "Soil Fertility Management",
          "Pest and Disease Management",
          "Irrigation Techniques",
          "Crop Selection and Rotation",
          "Livestock Care and Management",
          "Market Access and Agricultural Economics",
          "Sustainable Farming Practices"
        ]} 
        hasOther
        onChange={(values, otherValue) => {
          updateFormData("interestAreas", values);
          if (otherValue !== undefined) {
            updateFormData("otherInterestArea", otherValue);
          }
        }}
      />
      
      <TextArea 
        id="challenges" 
        label="Current Challenges on Your Farm" 
        onChange={(value) => updateFormData("challenges", value)}
      />
      
      <Dropdown 
        id="deliveryMethod" 
        label="What is your preferred method for receiving extension services?" 
        options={[
          "In-person consultation",
          "Online (Virtual meetings)",
          "Telephone consultation",
          "Written resources (e.g., manuals, reports)"
        ]} 
        onChange={(value) => updateFormData("deliveryMethod", value)}
      />
      
      <Dropdown 
        id="trainingPreference" 
        label="Would you like to participate in group training or individual consultation?" 
        options={["Group Training", "Individual Consultation", "Both"]} 
        onChange={(value) => updateFormData("trainingPreference", value)}
      />
      
      <DatePicker 
        id="preferredDate" 
        label="Preferred Service Delivery Date" 
        onChange={(date) => updateFormData("preferredDate", date)}
      />
      
      <Dropdown 
        id="referralSource" 
        label="How did you hear about our extension services?" 
        options={["Referral", "Social Media", "Website"]} 
        onChange={(value) => updateFormData("referralSource", value)}
      />
      
      {formData.referralSource === "Other" && (
        <TextInput 
          id="otherReferralSource" 
          label="Please specify how you heard about us" 
          onChange={(value) => updateFormData("otherReferralSource", value)}
        />
      )}
      
      <div className="mt-8 flex justify-center">
        <SubmitButton isLoading={isSubmitting} />
      </div>
    </form>
  );
};

export default ExtensionServicesForm;
