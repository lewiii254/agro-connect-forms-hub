
import { useState } from "react";
import { 
  TextInput, 
  EmailInput, 
  PhoneInput, 
  CheckboxGroup, 
  Dropdown, 
  Toggle, 
  TextArea, 
  DatePicker, 
  SubmitButton 
} from "./FormComponents";
import { toast } from "@/components/ui/sonner";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  productTypes: string[];
  otherProductType?: string;
  experiencePeriod: string;
  previousTraining: boolean;
  trainingTopics: string[];
  otherTrainingTopic?: string;
  preferredDate?: Date;
  staffCount: string;
  wantsCertificate: boolean;
  referralSource: string;
  otherReferralSource?: string;
}

const AgroDealerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    location: "",
    productTypes: [],
    experiencePeriod: "",
    previousTraining: false,
    trainingTopics: [],
    staffCount: "",
    wantsCertificate: false,
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
        businessName: "",
        location: "",
        productTypes: [],
        experiencePeriod: "",
        previousTraining: false,
        trainingTopics: [],
        staffCount: "",
        wantsCertificate: false,
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
        id="businessName" 
        label="Business Name (if applicable)" 
        onChange={(value) => updateFormData("businessName", value)}
      />
      
      <TextInput 
        id="location" 
        label="Location (Region/County)" 
        required 
        onChange={(value) => updateFormData("location", value)}
      />
      
      <CheckboxGroup 
        id="productTypes" 
        label="Type of Agrovet Products Sold" 
        options={["Seeds", "Fertilizers", "Pesticides", "Animal Feeds", "Farm Equipment"]} 
        hasOther
        onChange={(values, otherValue) => {
          updateFormData("productTypes", values);
          if (otherValue !== undefined) {
            updateFormData("otherProductType", otherValue);
          }
        }}
      />
      
      <Dropdown 
        id="experiencePeriod" 
        label="How long have you been operating as an agro-dealer?" 
        options={["Less than 1 year", "1–3 years", "More than 3 years"]} 
        required
        onChange={(value) => updateFormData("experiencePeriod", value)}
      />
      
      <Toggle 
        id="previousTraining" 
        label="Have you previously attended any agro-dealer or agricultural training programs?" 
        onChange={(value) => updateFormData("previousTraining", value)}
      />
      
      <CheckboxGroup 
        id="trainingTopics" 
        label="What specific topics would you like covered in the training?" 
        options={[
          "Pesticide safety and handling",
          "Product knowledge (fertilizers, seeds, etc.)",
          "Customer service and business management",
          "Regulatory compliance (government requirements)",
          "Sales and marketing strategies"
        ]} 
        hasOther
        onChange={(values, otherValue) => {
          updateFormData("trainingTopics", values);
          if (otherValue !== undefined) {
            updateFormData("otherTrainingTopic", otherValue);
          }
        }}
      />
      
      <DatePicker 
        id="preferredDate" 
        label="Preferred Training Dates" 
        onChange={(date) => updateFormData("preferredDate", date)}
      />
      
      <TextInput 
        id="staffCount" 
        label="How many staff members (if any) would require training along with you?" 
        onChange={(value) => updateFormData("staffCount", value)}
      />
      
      <Toggle 
        id="wantsCertificate" 
        label="Would you like to receive a certificate upon completing the training?" 
        onChange={(value) => updateFormData("wantsCertificate", value)}
      />
      
      <Dropdown 
        id="referralSource" 
        label="How did you hear about our agro-dealer training services?" 
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

export default AgroDealerForm;
