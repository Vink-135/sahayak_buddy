
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, File, Image, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  onUploadComplete: (fileData: string) => void;
  onNext: () => void;
}

export const FileUpload = ({ onUploadComplete, onNext }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or image file (JPEG, PNG)",
        variant: "destructive"
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setUploading(true);
    
    // In a real app, this would be an actual API call to process the bill
    setTimeout(() => {
      setUploading(false);
      
      // Mock data - in a real app this would come from the OCR/document processing API
      const mockExtractedData = JSON.stringify({
        patientName: "Sharma, Priya",
        hospitalName: "Apollo Hospitals",
        admissionDate: "2023-11-10",
        dischargeDate: "2023-11-15",
        totalAmount: "₹45,750",
        diagnosis: "Acute Appendicitis",
        procedureType: "Surgery - Appendectomy",
        paymentMethod: "Insurance"
      });
      
      onUploadComplete(mockExtractedData);
      
      toast({
        title: "Upload successful",
        description: "Your hospital bill has been processed successfully.",
        variant: "default"
      });
    }, 2000);
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="h-10 w-10 text-cb-teal-600" />;
    
    if (file.type.startsWith('image/')) {
      return <Image className="h-10 w-10 text-cb-blue-600" />;
    } else {
      return <File className="h-10 w-10 text-cb-blue-600" />;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-cb-teal-800">Upload Hospital Bill</CardTitle>
        <CardDescription className="text-center">
          Upload your hospital bill to extract details automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-cb-teal-400 bg-cb-teal-50" : "border-gray-300"
          } transition-all duration-200 ease-in-out`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!uploading && !file && (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-cb-teal-50 flex items-center justify-center">
                {getFileIcon()}
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  Drag & drop your hospital bill here or
                </p>
                <Button
                  type="button"
                  className="bg-cb-teal-500 hover:bg-cb-teal-600"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Browse Files
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </div>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, JPEG, PNG (Max size: 5MB)
              </p>
            </div>
          )}

          {uploading && (
            <div className="space-y-4">
              <Loader2 className="h-10 w-10 text-cb-teal-600 animate-spin mx-auto" />
              <p className="text-gray-600">Processing your bill...</p>
            </div>
          )}

          {!uploading && file && (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <p className="text-gray-800 font-medium mb-1">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                onClick={onNext}
                className="bg-cb-orange-500 hover:bg-cb-orange-600 mt-4"
              >
                Continue to Next Step
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
