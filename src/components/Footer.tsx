
import { FileText, Phone, Mail, Cuboid } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-cb-teal-700 to-cb-teal-800 text-white py-8 relative overflow-hidden">
      {/* 3D floating icons background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          >
            <Cuboid className="text-white" style={{ width: 30 + i * 15, height: 30 + i * 15 }} />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="transform hover:scale-105 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Cuboid className="h-6 w-6 animate-float" />
              <h2 className="text-xl font-bold">ClaimBuddy Sahayak</h2>
            </div>
            <p className="text-cb-teal-100 mb-4">
              Simplifying medical insurance claims for everyone.
            </p>
          </div>
          
          <div className="transform hover:translate-y-[-5px] transition-all">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-cb-teal-100">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">Insurance Schemes</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">Track Your Claim</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block transform">FAQs</a></li>
            </ul>
          </div>
          
          <div className="transform hover:translate-y-[-5px] transition-all">
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3 text-cb-teal-100">
              <li className="flex items-center hover:translate-x-1 transform transition-all">
                <Phone className="h-5 w-5 mr-2" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center hover:translate-x-1 transform transition-all">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@claimbuddy.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cb-teal-700 mt-6 pt-6 text-center text-cb-teal-200 text-sm">
          <p>&copy; {new Date().getFullYear()} ClaimBuddy Sahayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
