
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Edit, CheckCircle } from "lucide-react";

interface BillDetailsProps {
  billData: string;
  onNext: () => void;
  onPrev: () => void;
}

interface BillDataType {
  patientName: string;
  hospitalName: string;
  admissionDate: string;
  dischargeDate: string;
  totalAmount: string;
  diagnosis: string;
  procedureType: string;
  paymentMethod: string;
}

export const BillDetails = ({ billData, onNext, onPrev }: BillDetailsProps) => {
  const [data, setData] = useState<BillDataType>({
    patientName: "",
    hospitalName: "",
    admissionDate: "",
    dischargeDate: "",
    totalAmount: "",
    diagnosis: "",
    procedureType: "",
    paymentMethod: ""
  });
  
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (billData) {
      try {
        const parsedData = JSON.parse(billData);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse bill data:", error);
      }
    }
  }, [billData]);

  const handleEdit = (field: string, value: string) => {
    setEditing(field);
    setEditValue(value);
  };

  const handleSave = () => {
    if (editing) {
      setData({ ...data, [editing]: editValue });
      setEditing(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setEditValue("");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-cb-teal-800">Hospital Bill Details</CardTitle>
        <CardDescription className="text-center">
          Review and confirm the extracted information
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <div className="mb-6 bg-cb-teal-50 p-4 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 text-cb-teal-600 mr-2" />
          <p className="text-sm text-cb-teal-800">
            We've automatically extracted these details from your bill. 
            Please verify and edit if necessary.
          </p>
        </div>
        
        <Table className="mb-6">
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-medium w-1/3 py-4">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </TableCell>
                <TableCell className="w-2/3 py-4">
                  {editing === key ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-cb-teal-500 hover:bg-cb-teal-600"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{value}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(key, value)}
                        className="text-cb-teal-600 hover:text-cb-teal-700 hover:bg-cb-teal-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
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
            Continue to Eligibility Check
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillDetails;
