import { Button } from "@/components/ui/button";
import { ArrowRight, Image } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative bg-gradient-to-b from-cb-teal-50 to-white py-16 px-4 overflow-hidden">
      {/* 3D floating icons background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Image 
              className="text-cb-teal-200 opacity-20 transform rotate-12" 
              size={20 + i * 10}
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <div className="mb-8 inline-block transform transition-transform hover:scale-105">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Medical Technology"
            className="w-24 h-24 mx-auto rounded-2xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300 object-cover"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-cb-teal-800 mb-4 transform transition-all hover:scale-105">
          Simplify Your Medical Insurance Claims
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto transform hover:translate-y-[-2px] transition-transform">
          Upload your hospital bills, check eligibility, and get assistance with claim forms 
          for Ayushman Bharat, ESI, state schemes and private insurance.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-cb-orange-500 hover:bg-cb-orange-600 text-white px-8 py-6 text-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-cb-teal-500 text-cb-teal-700 hover:bg-cb-teal-50 px-8 py-6 text-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            How It Works
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-105 transition-all hover:shadow-xl">
            <div className="text-cb-teal-500 font-bold mb-2 flex items-center">
              <Image className="mr-2 h-5 w-5" />
              Step 1
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Your Hospital Bill</h3>
            <p className="text-gray-600">Simply upload your bill as an image, PDF or share via WhatsApp.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-105 transition-all hover:shadow-xl">
            <div className="text-cb-teal-500 font-bold mb-2 flex items-center">
              <Image className="mr-2 h-5 w-5" />
              Step 2
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Check Eligibility</h3>
            <p className="text-gray-600">We'll analyze your details for insurance scheme eligibility.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-105 transition-all hover:shadow-xl">
            <div className="text-cb-teal-500 font-bold mb-2 flex items-center">
              <Image className="mr-2 h-5 w-5" />
              Step 3
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Process Your Claim</h3>
            <p className="text-gray-600">Get forms auto-filled, document checklists, and claim assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
