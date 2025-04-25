
import { useToast } from "@/components/ui/use-toast";
import { HelpCircle, Image, Cuboid } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { toast } = useToast();

  const showHelpToast = () => {
    toast({
      title: "Help & Support",
      description: "Need assistance with your claim? Call our helpline at 1800-XXX-XXXX or email support@claimbuddy.in",
    });
  };

  return (
    <header className="bg-white shadow-lg py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 transform hover:scale-105 transition-all">
          <div className="relative">
            <Cuboid className="h-8 w-8 text-cb-teal-600 animate-float" />
            <div className="absolute inset-0 bg-cb-teal-500 opacity-20 blur-lg"></div>
          </div>
          <h1 className="text-xl font-bold text-cb-teal-700 hover:text-cb-teal-800 transition-colors">
            ClaimBuddy Sahayak
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-cb-blue-600 hover:text-cb-blue-800 hover:bg-cb-blue-50 transform hover:scale-105 transition-all"
            onClick={showHelpToast}
          >
            <HelpCircle className="h-5 w-5 mr-1" />
            Help
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
