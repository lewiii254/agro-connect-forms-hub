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
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  previousTraining: boolean;
  techniques: string[];
  otherTechnique?: string;
  areaSize: string;
  peopleCount: string;
  preferredDate?: Date;
  challenges: string;
  referralSource: string;
  otherReferralSource?: string;
}

const SSPTrainingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    previousTraining: false,
    techniques: [],
    areaSize: "",
    peopleCount: "",
    challenges: "",
    referralSource: "",
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const insertData = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      experience: formData.experience,
      previous_training: formData.previousTraining,
      techniques: formData.techniques,
      other_technique: formData.otherTechnique || null,
      area_size: formData.areaSize || null,
      people_count: formData.peopleCount || null,
      preferred_date: formData.preferredDate
        ? formData.preferredDate.toISOString().split("T")[0]
        : null,
      challenges: formData.challenges || null,
      referral_source: formData.referralSource || null,
      other_referral_source: formData.otherReferralSource || null,
    };

    const { error } = await supabase.from("ssp_training_applications").insert([insertData]);
    if (error) throw error;

    toast.success("Application submitted successfully! We'll contact you soon.");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      previousTraining: false,
      techniques: [],
      areaSize: "",
      peopleCount: "",
      challenges: "",
      referralSource: "",
    });
  } catch (error: any) {
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
      
      <Dropdown 
        id="experience" 
        label="Current Experience with Pesticide Use" 
        options={[
          "Beginner (No experience)",
          "Intermediate (Some experience)",
          "Advanced (Extensive experience)"
        ]} 
        required
        onChange={(value) => updateFormData("experience", value)}
      />
      
      <Toggle 
        id="previousTraining" 
        label="Have you previously received any pesticide safety training?" 
        onChange={(value) => updateFormData("previousTraining", value)}
      />
      
      <CheckboxGroup 
        id="techniques" 
        label="Which specific pesticide application techniques are you interested in learning?" 
        options={[
          "Safe handling of pesticides",
          "Proper application techniques",
          "Calibration of spray equipment",
          "Personal protective equipment (PPE) usage",
          "Environmental impact of pesticides"
        ]} 
        hasOther
        onChange={(values, otherValue) => {
          updateFormData("techniques", values);
          if (otherValue !== undefined) {
            updateFormData("otherTechnique", otherValue);
          }
        }}
      />
      
      <TextInput 
        id="areaSize" 
        label="What is the size of the area where you plan to apply pesticides? (in acres)" 
        onChange={(value) => updateFormData("areaSize", value)}
      />
      
      <TextInput 
        id="peopleCount" 
        label="How many people from your group or farm would require training?" 
        onChange={(value) => updateFormData("peopleCount", value)}
      />
      
      <DatePicker 
        id="preferredDate" 
        label="Preferred Training Dates" 
        onChange={(date) => updateFormData("preferredDate", date)}
      />
      
      <TextArea 
        id="challenges" 
        label="Any specific challenges or concerns you'd like to address in the training?" 
        onChange={(value) => updateFormData("challenges", value)}
      />
      
      <Dropdown 
        id="referralSource" 
        label="How did you hear about our SSP Training services?" 
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

export default SSPTrainingForm;
