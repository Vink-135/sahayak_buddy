
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText, Download, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentChecklistProps {
  onPrev: () => void;
  onComplete: () => void;
}

export const DocumentChecklist = ({ onPrev, onComplete }: DocumentChecklistProps) => {
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const documents = [
    {
      id: "aadhar",
      name: "Aadhar Card",
      required: true,
      description: "Primary identity proof required for all schemes"
    },
    {
      id: "discharge",
      name: "Hospital Discharge Summary",
      required: true,
      description: "Medical document showing treatment details"
    },
    {
      id: "bills",
      name: "Original Medical Bills",
      required: true,
      description: "All itemized bills and payment receipts"
    },
    {
      id: "prescription",
      name: "Doctor's Prescription",
      required: true,
      description: "All prescriptions related to treatment"
    },
    {
      id: "reports",
      name: "Medical Investigation Reports",
      required: false,
      description: "Lab reports, scans, X-rays as applicable"
    },
    {
      id: "insurance",
      name: "Insurance Card",
      required: true,
      description: "PMJAY card or other insurance ID"
    },
    {
      id: "photo",
      name: "Passport Size Photos",
      required: true,
      description: "2 recent passport size photographs"
    }
  ];

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems({
      ...checkedItems,
      [id]: checked,
    });
  };

  const handleGenerateForm = () => {
    setGenerating(true);
    
    // In a real app, this would call an API to generate the form
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      
      toast({
        title: "Form Generated Successfully",
        description: "Your claim form has been generated. You can download it now.",
      });
    }, 2000);
  };

  const handleDownloadForm = () => {
    toast({
      title: "Download Started",
      description: "Your claim form is being downloaded.",
    });
    
    // In a real app, this would actually download a file
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Form downloaded successfully!",
      });
    }, 1500);
  };

  const handleSubmitClaim = () => {
    toast({
      title: "Claim Submitted",
      description: "Your claim has been submitted for processing.",
    });
    onComplete();
  };

  const allRequiredChecked = documents
    .filter(doc => doc.required)
    .every(doc => checkedItems[doc.id]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-cb-teal-800">Required Documents</CardTitle>
        <CardDescription className="text-center">
          Please check the documents you have ready for claim submission
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <div className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-md flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              All required documents must be submitted with your claim to avoid rejection. 
              Original documents will need to be presented at the time of submission.
            </p>
          </div>
          
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox 
                  id={doc.id} 
                  checked={!!checkedItems[doc.id]}
                  onCheckedChange={(checked) => handleCheckboxChange(doc.id, !!checked)} 
                  className="mt-1"
                />
                <div className="flex-grow">
                  <div className="flex items-center">
                    <Label htmlFor={doc.id} className="font-medium">
                      {doc.name}
                    </Label>
                    {doc.required && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded ml-2">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                </div>
                <FileText className="h-5 w-5 text-cb-teal-500 flex-shrink-0" />
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="font-medium text-lg mb-2">Generate Claim Form</h3>
            <p className="text-gray-600 mb-4">
              We'll pre-fill your claim form with the information you've provided. 
              You can then download, print, and submit it.
            </p>
            
            {!generated ? (
              <Button 
                onClick={handleGenerateForm}
                disabled={generating || !allRequiredChecked}
                className="bg-cb-teal-500 hover:bg-cb-teal-600 w-full"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Form...
                  </>
                ) : (
                  <>Generate Claim Form</>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center text-green-600 mb-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Form generated successfully!</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    onClick={handleDownloadForm}
                    className="flex items-center justify-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Form
                  </Button>
                  <Button 
                    onClick={handleSubmitClaim}
                    className="bg-cb-orange-500 hover:bg-cb-orange-600 flex items-center justify-center"
                  >
                    Submit Claim
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onPrev}
              className="border-cb-teal-500 text-cb-teal-700 hover:bg-cb-teal-50"
            >
              Back
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentChecklist;
