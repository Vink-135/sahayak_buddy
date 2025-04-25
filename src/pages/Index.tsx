
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import UserInfoForm from "@/components/UserInfoForm";
import BillDetails from "@/components/BillDetails";
import EligibilityChecker from "@/components/EligibilityChecker";
import DocumentChecklist from "@/components/DocumentChecklist";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [billData, setBillData] = useState("");
  const { toast } = useToast();
  
  const steps = [
    "Welcome",
    "Upload Bill",
    "Personal Info",
    "Bill Details",
    "Check Eligibility",
    "Documents & Submission"
  ];
  
  const handleFileUploadComplete = (extractedData: string) => {
    setBillData(extractedData);
  };
  
  const handleGetStarted = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handleCompletion = () => {
    setCurrentStep(0); // Reset to homepage
    toast({
      title: "Claim Process Complete",
      description: "Your claim has been submitted successfully! You can track its status in your dashboard.",
      variant: "default"
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Welcome/Introduction Step */}
        <div className={`step-container ${currentStep === 0 ? "active" : ""}`}>
          <Hero onGetStarted={handleGetStarted} />
        </div>
        
        {/* Progress Indicator - Only show on steps 1-5 */}
        {currentStep > 0 && (
          <div className="container mx-auto px-4 py-6">
            <div className="progress-dots">
              {steps.slice(1).map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${
                    currentStep > index + 1 
                      ? "completed" 
                      : currentStep === index + 1 
                        ? "active" 
                        : ""
                  }`}
                />
              ))}
            </div>
            <h2 className="text-center font-medium text-gray-600 mb-6">
              Step {currentStep} of {steps.length - 1}: {steps[currentStep]}
            </h2>
          </div>
        )}
        
        {/* File Upload Step */}
        <div className={`step-container ${currentStep === 1 ? "active" : ""} container mx-auto px-4 py-8`}>
          <FileUpload 
            onUploadComplete={handleFileUploadComplete} 
            onNext={goToNextStep} 
          />
        </div>
        
        {/* User Info Form Step */}
        <div className={`step-container ${currentStep === 2 ? "active" : ""} container mx-auto px-4 py-8`}>
          <UserInfoForm 
            onNext={goToNextStep} 
            onPrev={goToPrevStep} 
          />
        </div>
        
        {/* Bill Details Step */}
        <div className={`step-container ${currentStep === 3 ? "active" : ""} container mx-auto px-4 py-8`}>
          <BillDetails 
            billData={billData} 
            onNext={goToNextStep} 
            onPrev={goToPrevStep} 
          />
        </div>
        
        {/* Eligibility Checker Step */}
        <div className={`step-container ${currentStep === 4 ? "active" : ""} container mx-auto px-4 py-8`}>
          <EligibilityChecker 
            onNext={goToNextStep} 
            onPrev={goToPrevStep} 
          />
        </div>
        
        {/* Document Checklist Step */}
        <div className={`step-container ${currentStep === 5 ? "active" : ""} container mx-auto px-4 py-8`}>
          <DocumentChecklist 
            onPrev={goToPrevStep} 
            onComplete={handleCompletion} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
