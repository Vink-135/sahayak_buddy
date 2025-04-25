
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EligibilityCheckerProps {
  onNext: () => void;
  onPrev: () => void;
}

export const EligibilityChecker = ({ onNext, onPrev }: EligibilityCheckerProps) => {
  const [checking, setChecking] = useState(true);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Array<{ 
    scheme: string; 
    eligible: boolean | null;
    reason?: string;
    coverage?: string;
    documents?: string[];
  }>>([]);

  useEffect(() => {
    // Simulate eligibility checking process
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
            setChecking(false);
            // Mock results - in a real app, this would come from API
            setResults([
              {
                scheme: "Ayushman Bharat (PMJAY)",
                eligible: true,
                coverage: "Up to ₹5,00,000 per family per year",
                documents: [
                  "Aadhar Card", 
                  "Hospital Discharge Summary",
                  "Original Bills",
                  "PMJAY Card"
                ]
              },
              {
                scheme: "ESI (Employee State Insurance)",
                eligible: false,
                reason: "Not registered under ESI scheme"
              },
              {
                scheme: "State Health Scheme",
                eligible: null,
                reason: "Additional verification required. Please visit your nearest health center."
              }
            ]);
          }, 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 10) + 5;
        return Math.min(oldProgress + increment, 100);
      });
    }, 600);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getEligibilityIcon = (eligible: boolean | null) => {
    if (eligible === true) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (eligible === false) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    } else {
      return <AlertTriangle className="h-6 w-6 text-amber-500" />;
    }
  };

  const getEligibilityText = (eligible: boolean | null) => {
    if (eligible === true) {
      return <span className="font-medium text-green-600">Eligible</span>;
    } else if (eligible === false) {
      return <span className="font-medium text-red-600">Not Eligible</span>;
    } else {
      return <span className="font-medium text-amber-600">Verification Needed</span>;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-cb-teal-800">Insurance Eligibility</CardTitle>
        <CardDescription className="text-center">
          Checking your eligibility for different health insurance schemes
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        {checking ? (
          <div className="space-y-6 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-cb-teal-600 mx-auto" />
            <div>
              <h3 className="font-medium text-lg mb-2">Checking eligibility...</h3>
              <p className="text-gray-600 mb-4">Please wait while we verify your details</p>
              <Progress value={progress} className="h-2 bg-gray-200" />
              <p className="mt-2 text-sm text-gray-500">{progress}% complete</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-6 mb-8">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-md ${
                    result.eligible === true 
                      ? 'bg-green-50 border border-green-100' 
                      : result.eligible === false 
                        ? 'bg-red-50 border border-red-100'
                        : 'bg-amber-50 border border-amber-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getEligibilityIcon(result.eligible)}
                      <h3 className="font-medium text-lg ml-2">{result.scheme}</h3>
                    </div>
                    {getEligibilityText(result.eligible)}
                  </div>
                  
                  {result.reason && (
                    <p className="text-gray-600 mb-2">{result.reason}</p>
                  )}
                  
                  {result.coverage && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Coverage:</span> {result.coverage}
                    </p>
                  )}
                  
                  {result.documents && result.documents.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Required Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.documents.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="bg-white">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
              <Button 
                onClick={onNext}
                className="bg-cb-orange-500 hover:bg-cb-orange-600"
              >
                Continue to Documents
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EligibilityChecker;
