
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserInfoFormProps {
  onNext: () => void;
  onPrev: () => void;
}

export const UserInfoForm = ({ onNext, onPrev }: UserInfoFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    aadharNumber: "",
    mobileNumber: "",
    email: "",
    state: "",
    insuranceType: "",
    policyNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and save the form data
    onNext();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-cb-teal-800">Personal Information</CardTitle>
        <CardDescription className="text-center">
          Please provide your personal and insurance details
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="As per Aadhar/PAN"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="120"
                placeholder="Your age"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={handleRadioChange}
                className="flex space-x-4"
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="12-digit Aadhar number"
                pattern="[0-9]{12}"
                minLength={12}
                maxLength={12}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                minLength={10}
                maxLength={10}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleSelectChange("state", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="west-bengal">West Bengal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceType">Insurance Type</Label>
              <Select
                value={formData.insuranceType}
                onValueChange={(value) => handleSelectChange("insuranceType", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ayushman-bharat">Ayushman Bharat (PMJAY)</SelectItem>
                  <SelectItem value="esi">ESI (Employee State Insurance)</SelectItem>
                  <SelectItem value="state-insurance">State Government Scheme</SelectItem>
                  <SelectItem value="private-insurance">Private Health Insurance</SelectItem>
                  <SelectItem value="none">No Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.insuranceType === "private-insurance" && (
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="Your insurance policy number"
                />
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
            <Button 
              type="submit"
              className="bg-cb-orange-500 hover:bg-cb-orange-600"
            >
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
